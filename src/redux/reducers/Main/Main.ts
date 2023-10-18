import { AVAILABLE_LANGUAGUES_CODES, ES_LANGUAGE } from 'src/language/language';
import { isAComputerDevice } from 'src/utils';
import { StateType, ActionType } from './Main.types';

const NAVIGATOR_LANG: string = window.navigator.language
  .slice(0, 2)
  .toLocaleLowerCase();
const DEFAULT_LANG_CODE: string = AVAILABLE_LANGUAGUES_CODES.includes(
  NAVIGATOR_LANG,
)
  ? NAVIGATOR_LANG
  : ES_LANGUAGE;
export const initialState: StateType = {
  route: 'home',
  expand: isAComputerDevice(),
  languageCode: DEFAULT_LANG_CODE,
  isLoading: false,
  error: { message: '' },
  additionalRegionCodes: {},
  stateCodes: {},
  vehicleTypes: {},
  userID: 'undefined',
  availableYears: { from_year: 1990, to_year: 2000 },
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
      return { ...state, isLoading: action.isLoading };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_ADDITIONAL_REGION_CODES':
      return { ...state, additionalRegionCodes: action.additionalRegionCodes };
    case 'SET_STATE_CODES':
      return { ...state, stateCodes: action.stateCodes };
    case 'SET_VEHICLE_TYPES':
      return { ...state, vehicleTypes: action.vehicleTypes };
    case 'SET_USER_ID':
      return { ...state, userID: action.userID };
    case 'SET_AVAILABLE_YEARS':
      return { ...state, availableYears: action.availableYears };
    default:
      return state;
  }
};

export default reducer;
