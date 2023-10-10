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
  LICENSE_PLATES_ROUTE,
} from './constants';
import { StateLicensePlatesPanel } from 'src/components/StateLicensePlatesPanel/StateLicensePlatesPanel';
import { MEXICO_STATE_CODE_TO_STATE_NAME } from 'src/utils/constants';

const mxStateNavigationItems: NavItemChild[] = [];

const navigationItems: NavItem[] = [
  {
    title: HOME_ROUTE.title,
    route: HOME_ROUTE.route,
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
  },
  {
    title: LICENSE_PLATES_ROUTE.title,
    route: LICENSE_PLATES_ROUTE.route,
    iconClass: 'fa-solid fa-car',
    childs: [
      ...Array.from(
        MEXICO_STATE_CODE_TO_STATE_NAME,
        ([stateCode, stateName]) => ({
          title: stateName,
          idChild: stateCode,
          route: `${LICENSE_PLATES_ROUTE.route}/${stateCode}`,
          functionalComponent: () => (
            <StateLicensePlatesPanel
              userID="user_fc3d81d8-f76a-4bb3-8645-c7baa1608b4c"
              languageCode="es"
              regionCode={stateCode}
            />
          ),
        }),
      ),

      // {
      //   title: "Nacional",
      //   idChild: "national",
      //   route: `${LICENSE_PLATES_ROUTE.route}/national`,
      //   functionalComponent: () => (
      //   <StateLicensePlatesPanel
      //     userID="user_fc3d81d8-f76a-4bb3-8645-c7baa1608b4c"
      //     languageCode="es"
      //     regionCode="NATIONAL"
      //   />
      //   ),
      // },
    ],
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
