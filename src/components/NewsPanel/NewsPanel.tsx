import React, { useState } from 'react';
import connector from 'src/connector';
import { BELicensePlatesData } from 'src/connector/backend.types';
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
import {
  BicycleVehicle,
  BusVehicle,
  CarVehicle,
  MotorcycleVehicle,
  TaxiVehicle,
  TrailerVehicle,
  TruckVehicle,
} from 'src/utils/vehicle_types';

export interface NewsPanelProps {
  numLatestSamples?: number;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ numLatestSamples = 20 }) => {
  const { userID, languageCode }: StateType = useSelector(
    (state) => state.main,
  );
  const translation = getTranslation(languageCode, 'News');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });
  const [carPlatesDataArray, setCarPlatesDataArray] = useState<
    BELicensePlatesData[]
  >([]);
  const [motorcyclePlatesDataArray, setMotorcyclePlatesDataArray] = useState<
    BELicensePlatesData[]
  >([]);
  const [bicyclePlatesDataArray, setBicyclePlatesDataArray] = useState<
    BELicensePlatesData[]
  >([]);

  useConstructor(async () => {
    try {
      setIsLoading(true);
      setCarPlatesDataArray(
        await connector.getLicensePlatesData(userID, {
          latest_samples: numLatestSamples,
          exclude_vehicle_types: ['MOTORCYCLE', 'BICYCLE'],
        }),
      );
      setMotorcyclePlatesDataArray(
        await connector.getLicensePlatesData(userID, {
          latest_samples: numLatestSamples,
          vehicle_types: ['MOTORCYCLE'],
        }),
      );
      setBicyclePlatesDataArray(
        await connector.getLicensePlatesData(userID, {
          latest_samples: numLatestSamples,
          vehicle_types: ['BICYCLE'],
        }),
      );
    } catch (error) {
      console.error(error);
      setError(handleErrorMessage(error, languageCode));
    } finally {
      setIsLoading(false);
    }
  });

  const transformDataToCarouselItems = (dataArray: BELicensePlatesData[]) => {
    return dataArray
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
  };

  const carCarouselItems = transformDataToCarouselItems(carPlatesDataArray);
  const motorcycleCarouselItems = transformDataToCarouselItems(
    motorcyclePlatesDataArray,
  );
  const bicycleCarouselItems = transformDataToCarouselItems(
    bicyclePlatesDataArray,
  );

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
        <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
          {/*  */}
          <AccordionItem>
            <AccordionHeader targetId="1">
              <span>{translation['NewPlates']['Header']}</span>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <p>{translation['NewPlates']['Body']}</p>

              <h3 className="Vechicle-Icons">
                <i className={CarVehicle.iconClassName} /> &nbsp;
                <i className={BusVehicle.iconClassName} />
                &nbsp;
                <i className={TruckVehicle.iconClassName} /> &nbsp;
                <i className={TrailerVehicle.iconClassName} />
                &nbsp;
                <i className={TaxiVehicle.iconClassName} />
                &nbsp;
              </h3>
              <div className="NewsPanel-Carousel">
                <UncontrolledCarousel
                  // controls={false}
                  indicators={false}
                  className="PlatesCarousel CAR"
                  items={carCarouselItems}
                />
              </div>

              {/* <hr/> */}
              <h3 className="Vechicle-Icons">
                <i className={MotorcycleVehicle.iconClassName} /> &nbsp;
              </h3>
              <div className="NewsPanel-Carousel">
                <UncontrolledCarousel
                  // controls={false}
                  indicators={false}
                  className="PlatesCarousel MOTORCYCLE"
                  items={motorcycleCarouselItems}
                />
              </div>

              {/* <hr/> */}
              <h3 className="Vechicle-Icons">
                <i className={BicycleVehicle.iconClassName} /> &nbsp;
              </h3>
              <div className="NewsPanel-Carousel">
                <UncontrolledCarousel
                  // controls={false}
                  indicators={false}
                  className="PlatesCarousel BICYCLE"
                  items={bicycleCarouselItems}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
          {/*  */}
          <AccordionItem>
            <AccordionHeader targetId="2">
              <span>{translation['DFSeries']['Header']}</span>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <p>{translation['DFSeries']['Body']}</p>

              {/* <div className="NewsPanel-Carousel"> */}
              <img className="NewsImage" src={imgDFPlates} alt="img" />
              {/* </div> */}
            </AccordionBody>
          </AccordionItem>
          {/*  */}
          <AccordionItem>
            <AccordionHeader targetId="3">
              <span>{translation['AntiquePlates']['Header']}</span>
            </AccordionHeader>
            <AccordionBody accordionId="3">
              <p>{translation['AntiquePlates']['Body']}</p>

              {/* <div className="NewsPanel-Carousel"> */}
              <img className="NewsImage" src={imgAntiquePlates} alt="img" />
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
