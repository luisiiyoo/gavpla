import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'src/redux/store';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import './App.css';
import { MainComponent } from '../MainComponent/MainComponent';

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ReactNotification />
      <div className="App">
        <MainComponent />
      </div>
    </Provider>
  );
};

export default App;
