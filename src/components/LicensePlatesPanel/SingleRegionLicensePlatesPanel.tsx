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

export interface SingleRegionLicensePlatesPanelProps {
  regionCode: string;
  headerTitle?: string;
  displayHeaderTitle: boolean;

  isAStateLicensePlate?: boolean;
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
  selectStateHandler: (state: string) => void;
}

const SingleRegionLicensePlatesPanel: React.FC<SingleRegionLicensePlatesPanelProps> = ({
  regionCode,
  hideStateName = false,
  hideYears = false,
  hideVehicleType = false,
}) => {
  const {
    vehicleTypes,
    stateCodes,
    additionalRegionCodes,
    userID,
    availableYears,
    languageCode,
  }: StateType = useSelector((state) => state.main);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  let regionCodesToFilter: Set<string>;
  let title: string;
  if (regionCode === 'NATIONAL') {
    // debugger
    title = TRANSLATIONS.RegionNames[languageCode].NATIONAL;
    regionCodesToFilter = new Set(Object.keys(stateCodes));
  } else if (regionCode === 'METROPOLITAN') {
    title = TRANSLATIONS.RegionNames[languageCode].METROPOLITAN;
    regionCodesToFilter = new Set(['DF', 'MEX']);
  } else {
    title = stateCodes[regionCode];
    regionCodesToFilter = new Set([regionCode]);
  }

  useConstructor(async () => {
    try {
      setIsLoading(true);
      const params: BEQueryLicensePlatesData = {
        region_code: regionCode,
        from_year: availableYears.from_year,
        to_year: availableYears.to_year,
      };
      const platesData: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );
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
        </div>
      )}
    </>
  );
};

export default SingleRegionLicensePlatesPanel;
