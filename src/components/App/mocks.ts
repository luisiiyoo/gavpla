export const navItemsMock = [
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
