import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import connector from 'src/connector';
import { setIsLoading } from 'src/redux/actions/MainComponent/MainComponent';
import Routes from 'src/routers';
import { useConstructor } from 'src/utils';
import { AbstractError } from 'src/utils/error.types';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';

export const MainComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.main);

  const isError = !!error.message;

  useConstructor(async () => {
    try {
      dispatch(setIsLoading(true));
      // debugger;
      setTimeout(() => {
        console.log('World!');
      }, 12000);
      console.log('Luis');

      await connector.getUserID(true);
      //   debugger;
    } catch (error) {
      let statusCode: number = 500;
      let message: string = String(error);

      if (error instanceof AbstractError) {
        statusCode = error.statusCode;
        message = error.message;
      }

      //   debugger;
      //   dispatch(setError({ message, statusCode }));
    } finally {
      console.log('Hey');
      //   dispatch(setIsLoading(false));
    }
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorDisplay message={error.message} statusCode={error.statusCode} />
      ) : (
        <Routes />
      )}
    </>
  );
};
