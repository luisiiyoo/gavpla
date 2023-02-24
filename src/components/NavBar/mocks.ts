import { NavItem } from '../../model/navItem';

export const navItemMock: NavItem[] = [
  {
    route: 'my-home',
    title: 'My Home',
    iconClass: 'fa fa-fw fa-heartbeat',
  },
  {
    route: 'free-code-camp',
    title: 'Free Code Camp',
    iconClass: 'fa fa-fw fa-beer',
    childs: [
      {
        idChild: '1',
        route: 'sub-page',
        title: 'SubPage',
      },
    ],
  },
];

export const stateMock = {
  main: {
    route: 'home',
    expand: true,
  },
};
