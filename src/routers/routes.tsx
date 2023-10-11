import React from 'react';
// import CreateGame from 'src/components/CreateGame';
// import GamesBoard from 'src/components/GamesBoard';
import HomePage from 'src/components/HomePage';
import MexicoCollection from 'src/components/Collection';
// import PlayGame from 'src/components/PlayGame';
import { AbstractNavItem, NavItem, NavItemChild } from './Router.types';
import {
  COLLECTION_1968_1999_ROUTE,
  SEARCH_ROUTE,
  DONATIONS_ROUTE,
  HOME_ROUTE,
  STATES_ROUTE,
  THANKS_ROUTE,
  FEDERAL_ROUTE,
  NEW_ROUTE,
  SHOP_PLATES_ROUTE,
} from './constants';
import { StateLicensePlatesPanel } from 'src/components/StateLicensePlatesPanel/StateLicensePlatesPanel';
import { MEXICO_STATE_CODE_TO_STATE_NAME } from 'src/utils/constants';
import UnderConstruction from 'src/components/UnderConstruction/UnderConstruction';

const navigationItems: NavItem[] = [
  {
    title: HOME_ROUTE.title,
    route: HOME_ROUTE.route,
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
  },
  {
    title: NEW_ROUTE.title,
    route: NEW_ROUTE.route,
    iconClass: 'fa-solid fa-newspaper',
    functionalComponent: () => <UnderConstruction />,
  },
  {
    title: STATES_ROUTE.title,
    route: STATES_ROUTE.route,
    iconClass: 'fa-solid fa-car',
    childs: [
      ...Array.from(
        MEXICO_STATE_CODE_TO_STATE_NAME,
        ([stateCode, stateName]) => ({
          title: stateName,
          idChild: stateCode,
          route: `${STATES_ROUTE.route}/${stateCode}`,
          functionalComponent: () => (
            <StateLicensePlatesPanel
              userID="user_fc3d81d8-f76a-4bb3-8645-c7baa1608b4c"
              languageCode="es"
              regionCode={stateCode}
            />
          ),
        }),
      ),
    ],
  },
  {
    title: FEDERAL_ROUTE.title,
    route: FEDERAL_ROUTE.route,
    iconClass: 'fa-solid fa-flag',
    functionalComponent: () => (
      <StateLicensePlatesPanel
        userID="user_fc3d81d8-f76a-4bb3-8645-c7baa1608b4c"
        languageCode="es"
        regionCode="NATIONAL"
      />
    ),
  },
  {
    title: SEARCH_ROUTE.title,
    route: SEARCH_ROUTE.route,
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
    functionalComponent: () => <UnderConstruction />,
  },
  {
    title: THANKS_ROUTE.title,
    route: THANKS_ROUTE.route,
    iconClass: 'fa-solid fa-heart',
    functionalComponent: () => <UnderConstruction />,
  },
  {
    title: SHOP_PLATES_ROUTE.title,
    route: SHOP_PLATES_ROUTE.route,
    iconClass: 'fa-solid fa-cart-shopping',
    functionalComponent: () => <UnderConstruction />,
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
