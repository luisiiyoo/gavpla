import { NavItem } from 'src/model/navItem';

export interface RouterProps {
  navBarItems?: NavItem[];
}

export interface MainComponentProps {
  isExpandedNavBar: boolean;
  navBarItems: NavItem[];
}
