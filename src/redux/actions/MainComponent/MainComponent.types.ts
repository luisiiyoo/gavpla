export interface SetSelectedRouteType {
  (route: string): { type: string; route: string };
}

export interface SetExpandNavBarType {
  (expand: boolean): { type: string; expand: boolean };
}

export interface SetLanguageType {
  (languageCode: string): { type: string; languageCode: string };
}
