import {
  BELicensePlateAvailableYears,
  BELicensePlateRegionCodes,
  BEVehicleTypes,
} from 'src/connector/backend.types';
import {
  SetSelectedRouteType,
  SetExpandNavBarType,
  SetLanguageType,
  SetIsLoadingType,
  SetErrorType,
  FEError,
  SetVehicleTypesType,
  SetStateCodesType,
  SetAdditionalRegionCodesType,
  SetUserIDType,
  SetAvailableYearsType,
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

export const setAdditionalRegionCodes: SetAdditionalRegionCodesType = (
  additionalRegionCodes: BELicensePlateRegionCodes,
) => ({
  type: 'SET_ADDITIONAL_REGION_CODES',
  additionalRegionCodes,
});

export const setStateCodes: SetStateCodesType = (
  stateCodes: BELicensePlateRegionCodes,
) => ({
  type: 'SET_STATE_CODES',
  stateCodes,
});

export const setVehicleTypes: SetVehicleTypesType = (
  vehicleTypes: BEVehicleTypes,
) => ({
  type: 'SET_VEHICLE_TYPES',
  vehicleTypes,
});

export const setUserID: SetUserIDType = (userID: string) => ({
  type: 'SET_USER_ID',
  userID,
});

export const setAvailableYears: SetAvailableYearsType = (
  availableYears: BELicensePlateAvailableYears,
) => ({
  type: 'SET_AVAILABLE_YEARS',
  availableYears,
});
