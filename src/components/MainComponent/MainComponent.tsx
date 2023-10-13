import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import connector from 'src/connector';
import { setError, setIsLoading } from 'src/redux/actions/Main/Main';
import Routes from 'src/routers';
import { useConstructor } from 'src/utils';
import { AbstractError } from 'src/utils/error.types';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';

export const MainComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.main);

  useConstructor(async () => {
    try {
      dispatch(setError({}));
      dispatch(setIsLoading(true));

      await connector.getUserID(true);
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
