import { StateType, ActionType } from './MainComponent.types';

export const initialState: StateType = {
  route: 'home',
  expand: true,
};

const reducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_SELECTED_ROUTE':
      if (action.route === state.route) return state;
      return { ...state, route: action.route };
    case 'SET_EXPAND_NAVBAR':
      return { ...state, expand: action.expand };
    default:
      return state;
  }
};

export default reducer;
