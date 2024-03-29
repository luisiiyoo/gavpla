import { NavItem } from 'src/routers/Router.types';

interface History {
  push(path: string): void;
  location: {
    pathname: string;
  };
}
export interface OnChangeRoute {
  (selectedRoute: string): void;
}

export interface OnSelectNavItem {
  (selected: string, history: History): void;
}

export interface NavBarProps {
  navBarTitle: string;
  history: History;
}

export interface RenderNavItem {
  (dispatch: any, item: NavItem, isChild?: boolean): void;
}
