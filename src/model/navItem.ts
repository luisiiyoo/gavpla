import React from 'react';

export interface AbstractNavItem {
  title: string;
  route: string;
  functionalComponent?: React.FC;
  childs?: NavItemChild[];
}

export interface NavItemChild extends AbstractNavItem {
  idChild: string;
  // route: string;
  // title: string;
  // functionalComponent?: React.FC;
}

export interface NavItem extends AbstractNavItem {
  // route: string;
  // title: string;
  iconClass?: string;
  // functionalComponent?: React.FC;
  // childs?: NavItemChild[];
}
