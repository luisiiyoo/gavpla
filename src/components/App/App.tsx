import React, { useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'src/redux/store';
import Routes from 'src/routers';
import connector from 'src/connector';
import Loader from '../Loader';
import ErrorDisplay from '../ErrorDisplay';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import './App.css';

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
      // await connector.checkBackendHealth();
    } catch (error_) {
      setError({
        statusCode: error_.statusCode,
        message: error_.message,
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
