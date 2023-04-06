import React from 'react';
// import CreateGame from 'src/components/CreateGame';
// import GamesBoard from 'src/components/GamesBoard';
import HomePage from 'src/components/HomePage';
import MexicoCollection from 'src/components/Collection';
// import PlayGame from 'src/components/PlayGame';
import { AbstractNavItem, NavItem } from './Router.types';

const navigationItems: NavItem[] = [
  {
    title: 'Home',
    route: '',
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
  },
  {
    title: 'Home',
    route: 'license-plates-gallery',
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
  },
  {
    title: 'Collection',
    route: 'collection',
    iconClass: 'fa fw fa-earth-americas',
    childs: [
      {
        title: 'México',
        idChild: 'collection.mexico',
        route: 'collection/mexico',
        functionalComponent: () => <MexicoCollection />,
      },
    ],
  },
  // {
  //   title: 'Collection',
  //   route: 'collection',
  //   iconClass: 'fa fw fa-earth-americas',
  //   childs: [
  //     {
  //       title: 'Personal',
  //       idChild: 'collection.personal',
  //       route: 'collection/personal',
  //       functionalComponent: () => <GamesBoard finished={true} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Shop',
  //   route: 'shop',
  //   iconClass: 'fa fa-fw fa-cart-shopping',
  //   functionalComponent: () => <CreateGame />,
  // },
  // {
  //   title: 'Contributors',
  //   route: 'contributors',
  //   iconClass: 'fa fa-fw fa-users',
  //   functionalComponent: () => <PlayGame />,
  // },
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
