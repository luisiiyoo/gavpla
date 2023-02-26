import React from 'react';

export interface AbstractNavItem {
  title: string;
  route: string;
  functionalComponent?: React.FC;
  childs?: NavItemChild[];
}

export interface NavItemChild extends AbstractNavItem {
  idChild: string;
}

export interface NavItem extends AbstractNavItem {
  iconClass?: string;
}

export interface RouterProps {
  navBarItems?: NavItem[];
}

export interface MainComponentProps {
  isExpandedNavBar: boolean;
}
