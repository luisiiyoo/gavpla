import React, { useState } from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { TRANSLATIONS } from 'src/language';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { toTitleCase, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { LicensePlatesPanel } from './LicensePlatesPanel';

export interface SingleRegionLicensePlatesPanelProps {
  regionCode: string;
}

const SingleRegionLicensePlatesPanel: React.FC<SingleRegionLicensePlatesPanelProps> = ({
  regionCode,
}) => {
  const {
    stateCodes,
    userID,
    availableYears,
    languageCode,
  }: StateType = useSelector((state) => state.main);

  const [platesDataArray, setPlatesDataArray] = useState<BELicensePlatesData[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  let regionCodesToFilter: Array<string>;
  let title: string;
  if (regionCode === 'NATIONAL') {
    title = TRANSLATIONS.RegionNames[languageCode].NATIONAL;
    regionCodesToFilter = Object.keys(stateCodes);
  } else if (regionCode === 'METROPOLITAN') {
    title = TRANSLATIONS.RegionNames[languageCode].METROPOLITAN;
    regionCodesToFilter = ['DF', 'MEX'];
  } else {
    title = stateCodes[regionCode];
    regionCodesToFilter = [regionCode];
  }

  useConstructor(async () => {
    try {
      setIsLoading(true);
      const params: BEQueryLicensePlatesData = {
        region_code: regionCode,
        from_year: availableYears.from_year,
        to_year: availableYears.to_year,
      };
      const data: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );
      setPlatesDataArray(data);
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

  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="SingleRegionLicensePlatesPanel">
          <Header title={toTitleCase(title)} />
          <LicensePlatesPanel
            platesDataArray={platesDataArray}
            hideStateName={true}
            staticMap={true}
            selectStateHandler={(val) => {}}
            regionCodesToFilter={regionCodesToFilter}
          />
        </div>
      )}
    </>
  );
};

export default SingleRegionLicensePlatesPanel;
