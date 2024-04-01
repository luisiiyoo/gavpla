import React, { useState } from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { handleErrorMessage, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { LicensePlatesPanel } from './LicensePlatesPanel';

export interface YearSerieLicensePlatesPanelProps {
  title: string;
  displayMap: boolean;
  fromYear: number;
  toYear: number;
  vehicle_types?: string[];
  exclude_vehicle_types?: string[];
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
}

const YearSerieLicensePlatesPanel: React.FC<YearSerieLicensePlatesPanelProps> = ({
  title,
  fromYear,
  toYear,
  displayMap,
  vehicle_types,
  exclude_vehicle_types,
  hideStateName,
  hideYears,
  hideVehicleType,
}) => {
  const { userID, languageCode }: StateType = useSelector(
    (state) => state.main,
  );
  const [platesDataArray, setPlatesDataArray] = useState<BELicensePlatesData[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  useConstructor(async () => {
    try {
      setIsLoading(true);
      const params: BEQueryLicensePlatesData = {
        from_year: fromYear,
        to_year: toYear,
      };
      vehicle_types && (params.vehicle_types = vehicle_types);
      exclude_vehicle_types &&
        (params.exclude_vehicle_types = exclude_vehicle_types);

      const data: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );
      // debugger
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
        <div className="YearSerieLicensePlatesPanel">
          <Header title={title} />
          <LicensePlatesPanel
            platesDataArray={platesDataArray}
            staticMap={true}
            displayMap={displayMap}
            selectStateHandler={(val) => {}}
            // regionCodesToFilter={regionCodes}
            hideStateName={hideStateName}
            hideYears={hideYears}
            hideVehicleType={hideVehicleType}
          />
        </div>
      )}
    </>
  );
};

export default YearSerieLicensePlatesPanel;
