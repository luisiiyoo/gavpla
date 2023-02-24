export interface NavItemChild {
  idChild: string;
  route: string;
  title: string;
}

export interface NavItem {
  route: string;
  title: string;
  iconClass?: string;
  childs?: NavItemChild[];
}
