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
import { LicensePlatesPanel } from './LicensePlatesPanel';

export interface MultipleRegionLicensePlatesPanelProps {
  title: string;
  regionCodes?: string[];
  vehicle_types?: string[];
  exclude_vehicle_types?: string[];
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
}

const MultipleRegionLicensePlatesPanel: React.FC<MultipleRegionLicensePlatesPanelProps> = ({
  title,
  regionCodes,
  vehicle_types,
  exclude_vehicle_types,
  hideStateName,
  hideYears,
  hideVehicleType,
}) => {
  const { userID, availableYears }: StateType = useSelector(
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
        from_year: availableYears.from_year,
        to_year: availableYears.to_year,
      };
      regionCodes && (params.region_codes = regionCodes);
      vehicle_types && (params.vehicle_types = vehicle_types);
      exclude_vehicle_types &&
        (params.exclude_vehicle_types = exclude_vehicle_types);

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
        <div className="MultipleRegionLicensePlatesPanel">
          <Header title={toTitleCase(title)} />
          <LicensePlatesPanel
            platesDataArray={platesDataArray}
            staticMap={true}
            selectStateHandler={(val) => {}}
            regionCodesToFilter={regionCodes}
            hideStateName={hideStateName}
            hideYears={hideYears}
            hideVehicleType={hideVehicleType}
          />
        </div>
      )}
    </>
  );
};

export default MultipleRegionLicensePlatesPanel;
