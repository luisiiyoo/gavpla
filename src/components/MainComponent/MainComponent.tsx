import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import connector from 'src/connector';
import {
  setAdditionalRegionCodes,
  setAvailableYears,
  setError,
  setIsLoading,
  setStateCodes,
  setUserID,
  setVehicleTypes,
} from 'src/redux/actions/Main/Main';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import Routes from 'src/routers';
import { handleErrorMessage, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';

export const MainComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error, languageCode }: StateType = useSelector(
    (state) => state.main,
  );

  useConstructor(async () => {
    try {
      dispatch(setError({}));
      dispatch(setIsLoading(true));

      // Get user ID from BE
      const userID = await connector.getUserID(true);
      dispatch(setUserID(userID));

      // Get vehicle types from BE
      const vehicleTypes = await connector.getVehicleTypes();
      dispatch(setVehicleTypes(vehicleTypes));

      // Get region codes from BE
      const stateCodes = await connector.getLicensePlatesStateCodes();
      dispatch(setStateCodes(stateCodes));

      const addtionalRegionCodes = await connector.getLicensePlatesAdditionalRegionCodes();
      dispatch(setAdditionalRegionCodes(addtionalRegionCodes));

      // Get available years from BE
      const availableYears = await connector.getLicensePlatesAvailableYears();
      dispatch(setAvailableYears(availableYears));
    } catch (error) {
      dispatch(setError(handleErrorMessage(error, languageCode)));
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
