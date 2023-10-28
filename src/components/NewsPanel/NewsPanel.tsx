import React, { useState } from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { toTitleCase, useConstructor } from 'src/utils';
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

export interface NewsPanelProps {
  numLatestSamples: number;
  numRandomSamples: number;
}

const NewsPanel: React.FC<NewsPanelProps> = ({
  numLatestSamples,
  numRandomSamples,
}) => {
  const { userID }: StateType = useSelector((state) => state.main);

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
      setError({
        statusCode: 500,
        message: `Unable get inventory data: ${error}`,
      });
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
  const title = 'Novedades';
  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? <Loader /> : undefined}
      <div
        className="NewsPanel"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <Header title={toTitleCase(title)} />
        <UncontrolledAccordion defaultOpen={['1']} stayOpen>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <span>New Plates</span>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <p>Some new license plates added recently to the collection.</p>

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
        </UncontrolledAccordion>
      </div>
    </>
  );
};

export default NewsPanel;
