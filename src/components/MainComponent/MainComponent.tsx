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
    dispatch(setError({}));
    dispatch(setIsLoading(true));

    let attemp = 1;
    const attempsLimit = 3;

    const pullGeneralData = async (): Promise<void> => {
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
    };

    function timeout(delay: number) {
      return new Promise((res) => setTimeout(res, delay));
    }

    while (attemp <= attempsLimit) {
      try {
        await pullGeneralData();
        attemp = attempsLimit;
      } catch (err) {
        const errMsg = (err as Error).message;
        console.log(`Attemp ${attemp} failed: ${errMsg}`);
        const isConnectionError: boolean =
          errMsg.includes('SSL connection has been closed') ||
          errMsg.includes('Unable to stablish connection');
        if (attemp < attempsLimit && isConnectionError) {
          await await timeout(5000);
        } else {
          dispatch(setError(handleErrorMessage(err, languageCode)));
          attemp = attempsLimit;
        }
      }
      attemp++;
    }
    dispatch(setIsLoading(false));
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
