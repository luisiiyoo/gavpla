import React, { useState } from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { TRANSLATIONS } from 'src/language';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { handleErrorMessage, toTitleCase, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { LicensePlatesPanel } from './LicensePlatesPanel';

export interface SingleRegionLicensePlatesPanelProps {
  regionCode: string;
  vehicle_types?: string[];
  exclude_vehicle_types?: string[];
}

const SingleRegionLicensePlatesPanel: React.FC<SingleRegionLicensePlatesPanelProps> = ({
  regionCode,
  exclude_vehicle_types,
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
  }else if (regionCode === 'DF') {
    title = `${stateCodes[regionCode]} / Ciudad de México`;
    regionCodesToFilter = [regionCode];
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
      exclude_vehicle_types &&
        (params.exclude_vehicle_types = exclude_vehicle_types);
      const data: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );
      setPlatesDataArray(data);
    } catch (error) {
      setError(handleErrorMessage(error, languageCode));
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
