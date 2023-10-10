import { StateType, ActionType } from './MainComponent.types';

const isAComputerDevice = (): boolean => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return false;
  }
  return true;
};

export const initialState: StateType = {
  route: 'home',
  expand: isAComputerDevice(),
  languageCode: 'es',
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
