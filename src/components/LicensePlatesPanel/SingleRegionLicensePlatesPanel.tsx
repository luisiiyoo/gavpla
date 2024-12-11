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
import { MxMap } from '../Maps/MxMap';
import { LicensePlateItemsPanel } from './LicensePlateItemsPanel/LicensePlateItemsPanel';

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
  let regionCodes: Array<string>;
  let title: string;
  if (regionCode === 'NATIONAL') {
    title = TRANSLATIONS.RegionNames[languageCode].NATIONAL;
    regionCodesToFilter = Object.keys(stateCodes);
    regionCodes = [regionCode];
  } else if (regionCode === 'METROPOLITAN') {
    title = TRANSLATIONS.RegionNames[languageCode].METROPOLITAN;
    regionCodesToFilter = ['DF', 'CDMX', 'MEX'];
    regionCodes = [regionCode];
  } else if (regionCode === 'DF' || regionCode === 'CDMX') {
    title = `${stateCodes['CDMX']} ( ${stateCodes['DF']} )`;
    regionCodesToFilter = ['DF', 'CDMX'];
    regionCodes = ['DF', 'CDMX'];
  } else {
    title = stateCodes[regionCode];
    regionCodesToFilter = [regionCode];
    regionCodes = [regionCode];
  }

  useConstructor(async () => {
    try {
      setIsLoading(true);
      const params: BEQueryLicensePlatesData = {
        region_codes: regionCodes,
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
          <MxMap
            selectStateHandler={(val) => {}}
            filteredStates={regionCodesToFilter}
            staticMap={true}
          />
          <LicensePlateItemsPanel
            platesDataArray={platesDataArray}
            hideStateName={true}
            // hideVehicleType={hideVehicleType}
          />
        </div>
      )}
    </>
  );
};

export default SingleRegionLicensePlatesPanel;
