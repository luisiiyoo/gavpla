import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import connector from 'src/connector';
import {
  setAdditionalRegionCodes,
  setError,
  setIsLoading,
  setStateCodes,
  setVehicleTypes,
} from 'src/redux/actions/Main/Main';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import Routes from 'src/routers';
import { useConstructor } from 'src/utils';
import { AbstractError } from 'src/utils/error.types';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';

export const MainComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error }: StateType = useSelector((state) => state.main);

  useConstructor(async () => {
    try {
      dispatch(setError({}));
      dispatch(setIsLoading(true));

      // Get user ID from BE
      await connector.getUserID(true);

      // Get vehicle types from BE
      const vehicleTypes = await connector.getVehicleTypes();
      dispatch(setVehicleTypes(vehicleTypes));

      // Get region codes from BE
      const stateCodes = await connector.getLicensePlatesStateCodes();
      dispatch(setStateCodes(stateCodes));

      const addtionalRegionCodes = await connector.getLicensePlatesAdditionalRegionCodes();
      dispatch(setAdditionalRegionCodes(addtionalRegionCodes));
    } catch (error) {
      let statusCode: number = 500;
      let message: string = String(error);

      if (error instanceof AbstractError) {
        statusCode = error.statusCode;
        message = error.message;
      }
      console.error(`${statusCode} - ${message}`);
      dispatch(setError({ message, statusCode }));
    } finally {
      dispatch(setIsLoading(false));
    }
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !!error.message ? (
        <ErrorDisplay message={error.message} statusCode={error.statusCode} />
      ) : (
        <Routes />
      )}
    </>
  );
};
