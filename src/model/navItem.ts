import React from "react";

export interface NavItemChild {
  idChild: string;
  route: string;
  title: string;
  functionalComponent?: React.FC;
}

export interface NavItem {
  route: string;
  title: string;
  iconClass?: string;
  functionalComponent?: React.FC;
  childs?: NavItemChild[];
}
