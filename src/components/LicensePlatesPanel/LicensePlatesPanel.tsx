import React, { useState } from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { toTitleCase, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';

import { LicensePlateItem } from '../LicensePlateItem/LicensePlateItem';
import Header from '../Header';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { MxMap } from '../Maps/MxMap';
import './style.css';
import { translations } from 'src/language';

export interface LicensePlatesPanelProps {
  headerTitle?: string;
  displayHeaderTitle: boolean;
  regionCodes: string[];
  isAStateLicensePlate?: boolean;
  fromYear?: number;
  toYear?: number;
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
  staticMap: boolean;
  selectStateHandler: (state: string) => void;
}

export const LicensePlatesPanel: React.FC<LicensePlatesPanelProps> = ({
  headerTitle,
  displayHeaderTitle,
  regionCodes,
  staticMap,
  selectStateHandler,
  fromYear,
  toYear,
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

  let regionCodesToFilter: Set<string> = new Set(regionCodes);
  let title: string = '';

  if (regionCodes.length === 1) {
    const regionCode = regionCodes[0];
    title =
      headerTitle ||
      stateCodes[regionCode] ||
      additionalRegionCodes[regionCode] ||
      regionCode;
    if (regionCode === 'NATIONAL') {
      // debugger
      title = translations.RegionNames[languageCode].NATIONAL;
      regionCodesToFilter = new Set(Object.keys(stateCodes));
    } else if (regionCode === 'METROPOLITAN') {
      title =
        headerTitle || translations.RegionNames[languageCode].METROPOLITAN;
      regionCodesToFilter = new Set(['DF', 'MEX']);
    } else {
      title = headerTitle || stateCodes[regionCode];
    }
    title = title || regionCode;
  } else {
    title = headerTitle || regionCodes.join(' - ');
  }

  let filterFromYear = fromYear;
  if (!fromYear) filterFromYear = availableYears.from_year;
  let filterToYear = toYear;
  if (!toYear) filterToYear = availableYears.to_year;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const [platesArray, setPlatesArray] = useState(
    new Array<BELicensePlatesData>(),
  );

  useConstructor(async () => {
    let allPlatesData: BELicensePlatesData[] = [];
    try {
      for (const regionCode of regionCodes) {
        const params: BEQueryLicensePlatesData = {
          region_code: regionCode,
          from_year: filterFromYear,
          to_year: filterToYear,
        };
        const platesData: BELicensePlatesData[] = await connector.getLicensePlatesData(
          userID,
          params,
        );
        allPlatesData.push(...platesData);
      }
      setPlatesArray(allPlatesData);
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
        <div className="LicensePlatesPanel">
          {displayHeaderTitle ? (
            <Header title={toTitleCase(title)} />
          ) : undefined}
          <MxMap
            selectStateHandler={selectStateHandler}
            filteredStates={Array.from(regionCodesToFilter)}
            staticMap={staticMap}
          />
          <div className="LicensePlatesPanel-LicensePlateItems">
            {platesArray.map((plateData) => (
              <LicensePlateItem
                data={plateData}
                userID={userID}
                vechicleTypes={vehicleTypes}
                key={plateData.plate_id_code}
                hideStateName={hideStateName}
                hideYears={hideYears}
                hideVehicleType={hideVehicleType}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
