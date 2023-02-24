import { NavItem } from 'src/model/navItem';

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
  navBarItems: NavItem[];
}

export interface RenderNavItem {
  (item: NavItem, isChild?: boolean): void;
}
