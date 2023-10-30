import React, { useState } from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { handleErrorMessage, toTitleCase, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';

import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import {
  UncontrolledCarousel,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from 'reactstrap';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTranslation } from 'src/language';
import imgAntiquePlates from 'src/images/news/antiquePlates.jpg';
import imgDFPlates from 'src/images/news/DFPlates.jpg';
import imgMotorcycle from 'src/images/news/motorcycle.jpg';

export interface NewsPanelProps {
  numLatestSamples: number;
  numRandomSamples: number;
}

const NewsPanel: React.FC<NewsPanelProps> = ({
  numLatestSamples,
  numRandomSamples,
}) => {
  const { userID, languageCode }: StateType = useSelector(
    (state) => state.main,
  );
  const translation = getTranslation(languageCode, 'News');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });
  const [platesDataArray, setPlatesDataArray] = useState<BELicensePlatesData[]>(
    [],
  );

  useConstructor(async () => {
    try {
      setIsLoading(true);
      const allResults: BELicensePlatesData[] = [];
      if (numLatestSamples > 0) {
        const params: BEQueryLicensePlatesData = {
          latest_samples: numLatestSamples,
        };
        const data: BELicensePlatesData[] = await connector.getLicensePlatesData(
          userID,
          params,
        );
        allResults.push(...data);
      }
      if (numRandomSamples > 0) {
        const params: BEQueryLicensePlatesData = {
          random_samples: numRandomSamples,
        };
        const data: BELicensePlatesData[] = await connector.getLicensePlatesData(
          userID,
          params,
        );
        allResults.push(...data);
      }
      setPlatesDataArray(allResults);
    } catch (error) {
      console.error(error);
      setError(handleErrorMessage(error, languageCode));
    } finally {
      setIsLoading(false);
    }
  });

  const carouselItems = platesDataArray
    .map((plate: BELicensePlatesData, key: number) => ({
      item: {
        altText: 'License plate image',
        header: ' ',
        caption: ' ',
        key: `${plate.plate_id_code}_{${key}}`,
        src: connector.getUserLicensePlatesImageURL(
          userID,
          plate.user_plate_id,
        ),
      },
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? <Loader /> : undefined}
      <div
        className="NewsPanel"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <Header title={toTitleCase(translation['Title'])} />
        <UncontrolledAccordion defaultOpen={['1']} stayOpen>
          {/*  */}
          <AccordionItem>
            <AccordionHeader targetId="1">
              <span>{translation['NewPlates']['Header']}</span>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <p>{translation['NewPlates']['Body']}</p>

              <div className="NewsPanel-Carousel">
                <UncontrolledCarousel
                  // controls={false}
                  indicators={false}
                  className="PlatesCarousel"
                  items={carouselItems}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
          {/*  */}
          <AccordionItem>
            <AccordionHeader targetId="2">
              <span>{translation['AntiquePlates']['Header']}</span>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <p>{translation['AntiquePlates']['Body']}</p>

              {/* <div className="NewsPanel-Carousel"> */}
              <img className="NewsImage" src={imgAntiquePlates} alt="img" />
              {/* </div> */}
            </AccordionBody>
          </AccordionItem>
          {/*  */}
          <AccordionItem>
            <AccordionHeader targetId="3">
              <span>{translation['DFSeries']['Header']}</span>
            </AccordionHeader>
            <AccordionBody accordionId="3">
              <p>{translation['DFSeries']['Body']}</p>

              {/* <div className="NewsPanel-Carousel"> */}
              <img className="NewsImage" src={imgDFPlates} alt="img" />
              {/* </div> */}
            </AccordionBody>
          </AccordionItem>
          {/*  */}
          <AccordionItem>
            <AccordionHeader targetId="4">
              <span>{translation['Motorcycle']['Header']}</span>
            </AccordionHeader>
            <AccordionBody accordionId="4">
              <p>{translation['Motorcycle']['Body']}</p>

              {/* <div className="NewsPanel-Carousel"> */}
              <img className="NewsImage" src={imgMotorcycle} alt="img" />
              {/* </div> */}
            </AccordionBody>
          </AccordionItem>
          {/*  */}
        </UncontrolledAccordion>
      </div>
    </>
  );
};

export default NewsPanel;
