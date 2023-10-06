import React from 'react';
// import CreateGame from 'src/components/CreateGame';
// import GamesBoard from 'src/components/GamesBoard';
import HomePage from 'src/components/HomePage';
import MexicoCollection from 'src/components/Collection';
// import PlayGame from 'src/components/PlayGame';
import { AbstractNavItem, NavItem } from './Router.types';
import {
  COLLECTION_1968_1999_ROUTE,
  COLLECTION_ROUTE,
  DONATIONS_ROUTE,
  HOME_ROUTE,
  VEHICLES_ROUTE,
} from './constants';

const navigationItems: NavItem[] = [
  // {
  //   title: 'Home',
  //   route: '',
  //   iconClass: 'fa fa-fw fa-home',
  //   functionalComponent: () => <HomePage />,
  // },
  {
    title: HOME_ROUTE.title,
    route: HOME_ROUTE.route,
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
  },
  {
    title: VEHICLES_ROUTE.title,
    route: VEHICLES_ROUTE.route,
    iconClass: 'fa-solid fa-car',
    functionalComponent: () => <></>,
  },
  {
    title: COLLECTION_ROUTE.title,
    route: COLLECTION_ROUTE.route,
    iconClass: 'fa fw fa-magnifying-glass',
    childs: [
      {
        title: COLLECTION_1968_1999_ROUTE.title,
        idChild: COLLECTION_1968_1999_ROUTE.route,
        route: COLLECTION_1968_1999_ROUTE.route,
        functionalComponent: () => <MexicoCollection />,
      },
    ],
  },
  {
    title: DONATIONS_ROUTE.title,
    route: DONATIONS_ROUTE.route,
    iconClass: 'fa-solid fa-hand-holding-heart',
    functionalComponent: () => <></>,
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
