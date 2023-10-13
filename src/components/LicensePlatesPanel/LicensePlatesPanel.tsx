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
// import { MexMap } from '../Maps/MexMap';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import './style.css';

export interface LicensePlatesPanelProps {
  userID: string;
  regionCode: string;
  isAStateLicensePlate?: boolean;
  fromYear?: number;
  toYear?: number;
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
  // selectStateHandler: (state: string) => void;
  // selectedState: string;
  // filteredStates: string[];
}

export const LicensePlatesPanel: React.FC<LicensePlatesPanelProps> = ({
  userID,
  regionCode,
  // isAStateLicensePlate = true,
  fromYear = 1968,
  toYear = 1999,
  hideStateName = false,
  hideYears = false,
  hideVehicleType = false,
}) => {
  const { vehicleTypes }: StateType = useSelector((state) => state.main);
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
          <Header title={toTitleCase(regionCode)} />
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
