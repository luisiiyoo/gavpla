import React from 'react';
import CreateGame from 'src/components/CreateGame';
import GamesBoard from 'src/components/GamesBoard';
import HomePage from 'src/components/HomePage';
import Inventory from 'src/components/Inventory';
import PlayGame from 'src/components/PlayGame';
import { AbstractNavItem, NavItem } from './Router.types';

const navigationItems: NavItem[] = [
  {
    title: 'Home',
    route: '',
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
  },
  {
    title: 'Inventory',
    route: 'inventory',
    iconClass: 'fa fa-fw fa-boxes-stacked',
    functionalComponent: () => <Inventory />,
  },
  {
    title: 'Collection',
    route: 'collection',
    iconClass: 'fa fw fa-earth-americas',
    childs: [
      {
        title: 'Personal',
        idChild: 'collection.personal',
        route: 'collection/personal',
        functionalComponent: () => <GamesBoard finished={true} />,
      },
    ],
  },
  {
    title: 'Shop',
    route: 'shop',
    iconClass: 'fa fa-fw fa-cart-shopping',
    functionalComponent: () => <CreateGame />,
  },
  {
    title: 'Contributors',
    route: 'contributors',
    iconClass: 'fa fa-fw fa-users',
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
