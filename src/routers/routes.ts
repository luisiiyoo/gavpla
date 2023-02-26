import HomePage from 'src/components/HomePage';
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
    route: '', //ROUTES.HOME
    title: 'Home',
    iconClass: 'fa fa-fw fa-home',
  },
  {
    route: 'games',
    title: 'Games',
    iconClass: 'fa fa-fw fa-search',
    childs: [
      {
        idChild: 'find_game/in-progress',
        route: 'find_game/in-progress',
        title: 'In Progress',
      },
      {
        idChild: 'find_game/finished',
        route: 'find_game/finished',
        title: 'Finished',
      },
    ],
  },
  {
    route: 'create-game',
    title: 'Create Game',
    iconClass: 'fa fa-fw fa-plus',
  },
  {
    route: 'play-game',
    title: 'Play Game',
    iconClass: 'fa fa-fw fa-gamepad',
  },
];
