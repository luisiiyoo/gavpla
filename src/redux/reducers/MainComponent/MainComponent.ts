import { ES_LANGUAGE } from 'src/language/language';
import { isAComputerDevice } from 'src/utils';
import { StateType, ActionType } from './MainComponent.types';

export const initialState: StateType = {
  route: 'home',
  expand: isAComputerDevice(),
  languageCode: ES_LANGUAGE, // TODO: Use window.navigator.language.slice(0,2)
  isLoading: false,
  error: { message: '' },
};

const reducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_SELECTED_ROUTE':
      if (action.route === state.route) return state;
      return { ...state, route: action.route };
    case 'SET_EXPAND_NAVBAR':
      return { ...state, expand: action.expand };
    case 'SET_LANGUAGE':
      return { ...state, languageCode: action.languageCode };
    case 'SET_IS_LOADING':
      return { ...state, expand: action.isLoading };
    case 'SET_ERROR':
      return { ...state, expand: action.error };
    default:
      return state;
  }
};

export default reducer;
