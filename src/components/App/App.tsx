import React, { useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'src/redux/store';
import Routes from 'src/routers';
import ReactNotification from 'react-notifications-component';
import Loader from '../Loader';
import ErrorDisplay from '../ErrorDisplay';
import 'react-notifications-component/dist/theme.css';
import './App.css';
import connector from 'src/connector';
import { AbstractError } from 'src/utils/error.types';

const store = configureStore();

const useConstructor = (callBack: () => void) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const App: React.FC = () => {
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useConstructor(async () => {
    try {
      const defaultAccessTokenID = await connector.getDefaultAccessTokenID();
      const metadataModifiedDate: Date = await connector.getMetadataModifiedDate(
        defaultAccessTokenID,
      );

      const lastUpdate: null | string = localStorage.getItem('lastUpdate');
      const isDeprecated: boolean =
        !lastUpdate || new Date(lastUpdate) < metadataModifiedDate;

      console.log('Is deprecated the data?: ', isDeprecated);
      if (isDeprecated) {
        const mexicoCarPlatesInventory = await connector.getCarPlatesInventory(
          defaultAccessTokenID,
        );
        console.log('mexicoCarPlatesInventory: ', mexicoCarPlatesInventory);
        localStorage.setItem(
          'mexicoCarPlatesInventory',
          mexicoCarPlatesInventory,
        );
      }
      localStorage.setItem('lastUpdate', metadataModifiedDate.toISOString());
    } catch (error) {
      let statusCode: number = 500;
      let message: string = String(error);

      if (error instanceof AbstractError) {
        statusCode = error.statusCode;
        message = error.message;
      }
      setError({
        statusCode: statusCode,
        message: message,
      });
    } finally {
      setIsLoading(false);
    }
  });

  const isError = !!error.message;
  const Component = isError ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <Routes />
  );

  return (
    <Provider store={store}>
      <ReactNotification />
      <div className="App" data-testid="App">
        {isLoading ? <Loader /> : Component}
      </div>
    </Provider>
  );
};

export default App;
