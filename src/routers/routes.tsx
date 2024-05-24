import React from 'react';
import HomePage from 'src/components/HomePage';
import { AbstractNavItem, NavItem } from './Router.types';
import {
  SEARCH_ROUTE,
  HOME_ROUTE,
  BY_STATES_ROUTE,
  NATIONAL_ROUTE,
  METROPOLITAN_ROUTE,
  FRONTIER_ROUTE,
  MISSING_PLATES_ROUTE,
  MOTORCYCLE_ROUTE,
  NEWS_ROUTE,
  BICYCLE_ROUTE,
  SHOP_PLATES_ROUTE,
  BY_YEARS_ROUTE,
} from './constants';
import {
  MEXICO_STATE_CODE_TO_STATE_NAME,
  MEXICO_YEAR_SERIES,
} from 'src/utils/constants';
import UnderConstruction from 'src/components/UnderConstruction/UnderConstruction';
import SearchLicensePlatesPanel from 'src/components/SearchLicensePlatesPanel/SearchLicensePlatesPanel';
import SingleRegionLicensePlatesPanel from 'src/components/LicensePlatesPanel/SingleRegionLicensePlatesPanel';
import MissingPlatesPanel from 'src/components/MissingPlatesPanel/MissingPlatesPanel';
import MultipleRegionLicensePlatesPanel from 'src/components/LicensePlatesPanel/MultipleRegionLicensePlatesPanel';
import NewsPanel from 'src/components/NewsPanel/NewsPanel';
import YearSerieLicensePlatesPanel from 'src/components/LicensePlatesPanel/YearSerieLicensePlatesPanel';
import MetropolitanLicensePlatesPanel from 'src/components/LicensePlatesPanel/MetropolitanLicensePlatesPanel';
import {
  BicycleVehicle,
  CarVehicle,
  FederalVehicle,
  FrontierVehicle,
  MetropolitanVehicle,
  MotorcycleVehicle,
} from 'src/utils/vehicle_types';

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
    functionalComponent: () => <NewsPanel />,
  },
  {
    title: BY_YEARS_ROUTE.title,
    route: BY_YEARS_ROUTE.route,
    iconClass: 'fa-solid fa-hourglass-half',
    childs: MEXICO_YEAR_SERIES.map(([fromYear, toYear]) => {
      const title = `${fromYear} - ${toYear}`;
      const subRoutetitle = `${fromYear}-${toYear}`;
      return {
        title: title,
        idChild: subRoutetitle,
        route: `${BY_YEARS_ROUTE.route}/${subRoutetitle}`,
        functionalComponent: () => (
          <YearSerieLicensePlatesPanel
            title={title}
            displayMap={true}
            fromYear={fromYear}
            toYear={toYear}
            exclude_vehicle_types={['MOTORCYCLE', 'BICYCLE', 'TRICYCLE']}
            hideStateName={false}
            hideYears={false}
            hideVehicleType={false}
          />
        ),
      };
    }),
  },
  {
    title: BY_STATES_ROUTE.title,
    route: BY_STATES_ROUTE.route,
    iconClass: CarVehicle.iconClassName,
    childs: [
      ...Array.from(
        MEXICO_STATE_CODE_TO_STATE_NAME,
        ([stateCode, stateName]) => ({
          title: stateName,
          idChild: stateCode,
          route: `${BY_STATES_ROUTE.route}/${stateCode}`,
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
    title: MOTORCYCLE_ROUTE.title,
    route: MOTORCYCLE_ROUTE.route,
    iconClass: MotorcycleVehicle.iconClassName,
    functionalComponent: () => (
      <MultipleRegionLicensePlatesPanel
        titleName="MOTORCYCLE"
        vehicle_types={['MOTORCYCLE']}
        hideStateName={false}
        hideYears={false}
        hideVehicleType={true}
      />
    ),
  },
  {
    title: BICYCLE_ROUTE.title,
    route: BICYCLE_ROUTE.route,
    iconClass: BicycleVehicle.iconClassName,
    functionalComponent: () => (
      <MultipleRegionLicensePlatesPanel
        titleName="BICYCLE"
        vehicle_types={['BICYCLE', 'TRICYCLE']}
        hideStateName={false}
        hideYears={false}
        hideVehicleType={true}
      />
    ),
  },
  {
    title: FRONTIER_ROUTE.title,
    route: FRONTIER_ROUTE.route,
    iconClass: FrontierVehicle.iconClassName,
    functionalComponent: () => (
      <MultipleRegionLicensePlatesPanel
        titleName="FRONTIER"
        regionCodes={['BC', 'BCS', 'CHIH', 'COAH', 'SON', 'TAMPS']}
        vehicle_types={['FRONTIER']}
        hideStateName={false}
        hideYears={false}
        hideVehicleType={true}
      />
    ),
  },
  {
    title: NATIONAL_ROUTE.title,
    route: NATIONAL_ROUTE.route,
    iconClass: FederalVehicle.iconClassName,
    functionalComponent: () => (
      <SingleRegionLicensePlatesPanel regionCode={'NATIONAL'} />
    ),
  },
  {
    title: METROPOLITAN_ROUTE.title,
    route: METROPOLITAN_ROUTE.route,
    iconClass: MetropolitanVehicle.iconClassName,
    functionalComponent: () => <MetropolitanLicensePlatesPanel />,
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
  {
    title: SHOP_PLATES_ROUTE.title,
    route: SHOP_PLATES_ROUTE.route,
    iconClass: 'fa-solid fa-cart-shopping',
    hidden: false,
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
