import { createStore, combineReducers } from 'redux';
import MainComponentReducer from '../reducers/MainComponent';

export default () => {
  const store = createStore(
    combineReducers({
      main: MainComponentReducer,
    }),
  );
  // store.subscribe(() => { console.log(store.getState().topicDetails) });
  return store;
};
