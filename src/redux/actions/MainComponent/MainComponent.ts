import {
  SetSelectedRouteType,
  SetExpandNavBarType,
} from './MainComponent.types';

export const setSelectedRoute: SetSelectedRouteType = (route: string) => ({
  type: 'SET_SELECTED_ROUTE',
  route,
});

export const setExpandNavBar: SetExpandNavBarType = (expand: boolean) => ({
  type: 'SET_EXPAND_NAVBAR',
  expand,
});
