import React from 'react';
// import CreateGame from 'src/components/CreateGame';
// import GamesBoard from 'src/components/GamesBoard';
import HomePage from 'src/components/HomePage';
// import PlayGame from 'src/components/PlayGame';
import { AbstractNavItem, NavItem } from './Router.types';
import {
  SEARCH_ROUTE,
  DONATIONS_ROUTE,
  HOME_ROUTE,
  STATES_ROUTE,
  THANKS_ROUTE,
  NATIONAL_ROUTE,
  NEW_ROUTE,
  SHOP_PLATES_ROUTE,
  METROPOLITAN_ROUTE,
} from './constants';
import { LicensePlatesPanel } from 'src/components/LicensePlatesPanel/LicensePlatesPanel';
import { MEXICO_STATE_CODE_TO_STATE_NAME } from 'src/utils/constants';
import UnderConstruction from 'src/components/UnderConstruction/UnderConstruction';
import SearchLicensePlatesPanel from 'src/components/SearchLicensePlatesPanel/SearchLicensePlatesPanel';

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
            <LicensePlatesPanel
              displayHeaderTitle={true}
              regionCodes={[stateCode]}
              hideStateName={true}
              staticMap={true}
              selectStateHandler={(val) => {}}
            />
          ),
        }),
      ),
    ],
  },
  {
    title: NATIONAL_ROUTE.title,
    route: NATIONAL_ROUTE.route,
    iconClass: 'fa-solid fa-flag',
    functionalComponent: () => (
      <LicensePlatesPanel
        displayHeaderTitle={true}
        regionCodes={['NATIONAL']}
        isAStateLicensePlate={false}
        hideStateName={true}
        staticMap={true}
        selectStateHandler={(val) => {}}
      />
    ),
  },
  {
    title: METROPOLITAN_ROUTE.title,
    route: METROPOLITAN_ROUTE.route,
    iconClass: 'fa-solid fa-bus',
    childs: [
      {
        title: 'DF - MX',
        idChild: 'df-mx',
        route: `${METROPOLITAN_ROUTE.route}/df-mx`,
        functionalComponent: () => (
          <LicensePlatesPanel
            displayHeaderTitle={true}
            regionCodes={['METROPOLITAN']}
            isAStateLicensePlate={false}
            hideStateName={true}
            staticMap={true}
            selectStateHandler={(val) => {}}
          />
        ),
      },
    ],
  },
  {
    title: SEARCH_ROUTE.title,
    route: SEARCH_ROUTE.route,
    iconClass: 'fa fw fa-magnifying-glass',
    functionalComponent: () => <SearchLicensePlatesPanel />,
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
