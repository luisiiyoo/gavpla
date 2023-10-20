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
import { UncontrolledCarousel } from 'reactstrap';
import './style.css';

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="NewsPanel">
          <Header title={toTitleCase(title)} />
          <p>H</p>
          <div className="NewsPanel-Carousel">
            <UncontrolledCarousel
              className="PlatesCarousel"
              items={carouselItems}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NewsPanel;
