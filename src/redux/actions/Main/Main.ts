import {
  SetSelectedRouteType,
  SetExpandNavBarType,
  SetLanguageType,
  SetIsLoadingType,
  SetErrorType,
  FEError,
} from './Main.types';

export const setSelectedRoute: SetSelectedRouteType = (route: string) => ({
  type: 'SET_SELECTED_ROUTE',
  route,
});

export const setExpandNavBar: SetExpandNavBarType = (expand: boolean) => ({
  type: 'SET_EXPAND_NAVBAR',
  expand,
});

export const setLanguage: SetLanguageType = (languageCode: string) => ({
  type: 'SET_LANGUAGE',
  languageCode,
});

export const setIsLoading: SetIsLoadingType = (isLoading: boolean) => ({
  type: 'SET_IS_LOADING',
  isLoading,
});

export const setError: SetErrorType = (error: FEError) => ({
  type: 'SET_ERROR',
  error,
});
