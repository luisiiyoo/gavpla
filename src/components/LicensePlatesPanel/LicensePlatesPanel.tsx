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

export interface LicensePlatesPanelProps {
  headerTitle?: string;
  displayHeaderTitle: boolean;
  userID: string;
  regionCode: string; // TODO: USE region codes
  isAStateLicensePlate?: boolean;
  fromYear?: number;
  toYear?: number;
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
  staticMap: boolean;
  // selectStateHandler: (state: string) => void;
  // filteredStates: string[];
}

export const LicensePlatesPanel: React.FC<LicensePlatesPanelProps> = ({
  headerTitle,
  displayHeaderTitle,
  userID,
  regionCode,
  staticMap,
  // isAStateLicensePlate = true,
  fromYear = 1968,
  toYear = 1999,
  hideStateName = false,
  hideYears = false,
  hideVehicleType = false,
}) => {
  const {
    vehicleTypes,
    stateCodes,
    additionalRegionCodes,
  }: StateType = useSelector((state) => state.main);
  const title: string =
    headerTitle ||
    stateCodes[regionCode] ||
    additionalRegionCodes[regionCode] ||
    regionCode;

  let statesToFilter: string[] = [];
  if (regionCode === 'NATIONAL') {
    statesToFilter = Object.keys(stateCodes);
  } else {
    statesToFilter = [regionCode];
  }

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const [platesArray, setPlatesArray] = useState(
    new Array<BELicensePlatesData>(),
  );

  useConstructor(async () => {
    try {
      const params: BEQueryLicensePlatesData = {
        region_code: regionCode,
        from_year: fromYear,
        to_year: toYear,
      };
      const platesData: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );
      setPlatesArray(platesData);
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
            selectStateHandler={(val) => {}} // TODO: use handler
            filteredStates={statesToFilter}
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
