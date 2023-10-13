export interface SetSelectedRouteType {
  (route: string): { type: string; route: string };
}

export interface SetExpandNavBarType {
  (expand: boolean): { type: string; expand: boolean };
}

export interface SetLanguageType {
  (languageCode: string): { type: string; languageCode: string };
}

export interface SetIsLoadingType {
  (isLoading: boolean): { type: string; isLoading: boolean };
}

export interface FEError {
  message?: string;
  statusCode?: number;
}
export interface SetErrorType {
  (error: FEError): { type: string; error: FEError };
}
