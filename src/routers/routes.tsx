import React from 'react';
import HomePage from 'src/components/HomePage';
import { AbstractNavItem, NavItem } from './Router.types';
import {
  SEARCH_ROUTE,
  HOME_ROUTE,
  STATES_ROUTE,
  NATIONAL_ROUTE,
  METROPOLITAN_ROUTE,
  FRONTIER_ROUTE,
  MISSING_PLATES_ROUTE,
  MOTORCYCLE_ROUTE,
  NEWS_ROUTE,
} from './constants';
import { MEXICO_STATE_CODE_TO_STATE_NAME } from 'src/utils/constants';
import UnderConstruction from 'src/components/UnderConstruction/UnderConstruction';
import SearchLicensePlatesPanel from 'src/components/SearchLicensePlatesPanel/SearchLicensePlatesPanel';
import SingleRegionLicensePlatesPanel from 'src/components/LicensePlatesPanel/SingleRegionLicensePlatesPanel';
import MissingPlatesPanel from 'src/components/MissingPlatesPanel/MissingPlatesPanel';
import MultipleRegionLicensePlatesPanel from 'src/components/LicensePlatesPanel/MultipleRegionLicensePlatesPanel';
import NewsPanel from 'src/components/NewsPanel/NewsPanel';

const navigationItems: NavItem[] = [
  {
    title: HOME_ROUTE.title,
    route: HOME_ROUTE.route,
    iconClass: 'fa fa-fw fa-home',
    functionalComponent: () => <HomePage />,
  },
  {
    title: HOME_ROUTE.title,
    route: 'gavpla',
    iconClass: 'fa fa-fw fa-home',
    hidden: true,
    functionalComponent: () => <HomePage />,
  },
  {
    title: NEWS_ROUTE.title,
    route: NEWS_ROUTE.route,
    iconClass: 'fa-solid fa-newspaper',
    functionalComponent: () => (
      <NewsPanel numLatestSamples={15} numRandomSamples={0} />
    ),
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
            <SingleRegionLicensePlatesPanel
              regionCode={stateCode}
              exclude_vehicle_types={['MOTORCYCLE', 'BICYCLE']}
            />
          ),
        }),
      ),
    ],
  },
  {
    title: METROPOLITAN_ROUTE.title,
    route: METROPOLITAN_ROUTE.route,
    iconClass: 'fa-solid fa-bus',
    childs: [
      {
        title: 'MEX - DF',
        idChild: 'mex-df',
        route: `${METROPOLITAN_ROUTE.route}/mex-df`,
        functionalComponent: () => (
          <SingleRegionLicensePlatesPanel regionCode={'METROPOLITAN'} />
        ),
      },
    ],
  },
  {
    title: NATIONAL_ROUTE.title,
    route: NATIONAL_ROUTE.route,
    iconClass: 'fa-solid fa-flag',
    functionalComponent: () => (
      <SingleRegionLicensePlatesPanel regionCode={'NATIONAL'} />
    ),
  },
  {
    title: FRONTIER_ROUTE.title,
    route: FRONTIER_ROUTE.route,
    iconClass: 'fa-solid fa-arrow-down-up-across-line',
    functionalComponent: () => (
      <MultipleRegionLicensePlatesPanel
        title={'Fronteriza'}
        regionCodes={['BC', 'BCS', 'CHIH', 'COAH', 'SON', 'TAMPS']}
        vehicle_types={['FRONTIER']}
        hideStateName={false}
        hideYears={false}
        hideVehicleType={true}
      />
    ),
  },
  {
    title: MOTORCYCLE_ROUTE.title,
    route: MOTORCYCLE_ROUTE.route,
    iconClass: 'fa-solid fa-motorcycle',
    functionalComponent: () => <UnderConstruction />,
  },
  {
    title: SEARCH_ROUTE.title,
    route: SEARCH_ROUTE.route,
    iconClass: 'fa fw fa-magnifying-glass',
    functionalComponent: () => <SearchLicensePlatesPanel />,
  },
  {
    title: MISSING_PLATES_ROUTE.title,
    route: MISSING_PLATES_ROUTE.route,
    iconClass: 'fa-solid fa-star-half',
    hidden: false,
    functionalComponent: () => <MissingPlatesPanel />,
  }, // fa-beat-fade
  // {
  //   title: DONATIONS_ROUTE.title,
  //   route: DONATIONS_ROUTE.route,
  //   iconClass: 'fa-solid fa-hand-holding-heart',
  //   functionalComponent: () => <UnderConstruction />,
  // },
  // {
  //   title: THANKS_ROUTE.title,
  //   route: THANKS_ROUTE.route,
  //   iconClass: 'fa-solid fa-heart',
  //   functionalComponent: () => <UnderConstruction />,
  // },
  // {
  //   title: SHOP_PLATES_ROUTE.title,
  //   route: SHOP_PLATES_ROUTE.route,
  //   iconClass: 'fa-solid fa-cart-shopping',
  //   functionalComponent: () => <UnderConstruction />,
  // },
  // Hidden Routes
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
