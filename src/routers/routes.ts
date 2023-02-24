import { NavItem } from '../model/navItem';

export const ROUTES = {
  HOME: 'home',
  GAMES: 'games',
  GAMES_FINISHED: 'find_game/finished',
  GAMES_IN_PROGRESS: 'find_game/in-progress',
  PLAY: 'play-game',
  CREATE: 'create-game',
};

export const navigationItems: NavItem[] = [
  {
    route: ROUTES.HOME,
    title: 'Home',
    iconClass: 'fa fa-fw fa-home',
  },
  {
    route: ROUTES.GAMES,
    title: 'Games',
    iconClass: 'fa fa-fw fa-search',
    childs: [
      {
        idChild: ROUTES.GAMES_IN_PROGRESS,
        route: ROUTES.GAMES_IN_PROGRESS,
        title: 'In Progress',
      },
      {
        idChild: ROUTES.GAMES_FINISHED,
        route: ROUTES.GAMES_FINISHED,
        title: 'Finished',
      },
    ],
  },
  {
    route: ROUTES.CREATE,
    title: 'Create Game',
    iconClass: 'fa fa-fw fa-plus',
  },
  {
    route: ROUTES.PLAY,
    title: 'Play Game',
    iconClass: 'fa fa-fw fa-gamepad',
  },
];
