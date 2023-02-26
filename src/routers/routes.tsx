import React from 'react';
import CreateGame from 'src/components/CreateGame';
import GamesBoard from 'src/components/GamesBoard';
import HomePage from 'src/components/HomePage';
import PlayGame from 'src/components/PlayGame';
import { AbstractNavItem, NavItem } from 'src/model/navItem';

const navigationItems: NavItem[] = [
  {
    route: '',
    title: 'Home',
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
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
        functionalComponent: () => <GamesBoard finished={true} />,
      },
      {
        idChild: 'find_game/finished',
        route: 'find_game/finished',
        title: 'Finished',
        functionalComponent: () => <GamesBoard finished={false} />,
      },
    ],
  },
  {
    route: 'create-game',
    title: 'Create Game',
    iconClass: 'fa fa-fw fa-plus',
    functionalComponent: () => <CreateGame />,
  },
  {
    route: 'play-game',
    title: 'Play Game',
    iconClass: 'fa fa-fw fa-gamepad',
    functionalComponent: () => <PlayGame />,
  },
];

const getFunctionalComponent = (
  items: AbstractNavItem[],
  result: AbstractNavItem[],
): void => {
  for (const item of items) {
    if (item.functionalComponent) {
      // Add the FC
      result.push(item);
    }
    if (item.childs) {
      // Add the child FC
      getFunctionalComponent(item.childs, result);
    }
  }
};

const navigationFCItems: AbstractNavItem[] = [];
getFunctionalComponent(navigationItems, navigationFCItems);

export { navigationItems, navigationFCItems };
