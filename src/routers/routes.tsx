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
  ABBREVIATIONS_ROUTE,
  IDENTIFY_PLATES_ROUTE,
} from './constants';
import {
  MEXICO_STATE_CODE_TO_STATE_NAME,
  MEXICO_YEAR_SERIES,
} from 'src/utils/constants';
import UnderConstruction from 'src/components/UnderConstruction/UnderConstruction';
import SearchLicensePlatesPanel from 'src/components/SearchLicensePlatesPanel/SearchLicensePlatesPanel';
import { FederalLicensePlatesPanel } from 'src/components/LicensePlatesPanel/FederalLicensePlatesPanel';
import MissingPlatesPanel from 'src/components/MissingPlatesPanel/MissingPlatesPanel';
import MultipleRegionLicensePlatesPanel from 'src/components/LicensePlatesPanel/MultipleRegionLicensePlatesPanel';
import NewsPanel from 'src/components/NewsPanel/NewsPanel';
import YearSerieLicensePlatesPanel from 'src/components/LicensePlatesPanel/YearSerieLicensePlatesPanel';
import MetropolitanLicensePlatesPanel from 'src/components/LicensePlatesPanel/MetropolitanLicensePlatesPanel';
import {
  BicycleVehicle,
  FrontierVehicle,
  MetropolitanVehicle,
  MotorcycleVehicle,
  NO_CAR_VEHICLES,
} from 'src/utils/vehicle_types';
import LicensePlateInformationPanel from 'src/components/LicensePlateInformationPanel';
import AbbreviationsPanel from 'src/components/LicensePlateInformationPanel/AbbreviationsPanel/AbbreviationsPanel';
import { SingleRegionLicensePlatesPanel } from 'src/components/LicensePlatesPanel/SingleRegionLicensePlatesPanel';

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
    title: ABBREVIATIONS_ROUTE.title,
    route: ABBREVIATIONS_ROUTE.route,
    iconClass: 'fa-solid fa-book-bookmark',
    functionalComponent: () => <AbbreviationsPanel />,
  },
  {
    title: IDENTIFY_PLATES_ROUTE.title,
    route: IDENTIFY_PLATES_ROUTE.route,
    iconClass: 'fa-solid fa-circle-info',
    functionalComponent: () => <LicensePlateInformationPanel />,
  },
  // {
  //   title: INFORMATION_ROUTE.title,
  //   route: INFORMATION_ROUTE.route,
  //   iconClass: 'fa-solid fa-book-bookmark',
  //   functionalComponent: () => <LicensePlateInformationPanel />,
  //   childs: [
  //   //   {
  //   //   title: ABBREVIATIONS_ROUTE.title,
  //   //   idChild: ABBREVIATIONS_ROUTE.route,
  //   //   route: ABBREVIATIONS_ROUTE.route,
  //   //   functionalComponent: () => (
  //   //     <AbbreviationsPanel />
  //   //   ),
  //   // },
  //   {
  //     title: IDENTIFY_PLATES_ROUTE.title,
  //     idChild: IDENTIFY_PLATES_ROUTE.route,
  //     route: IDENTIFY_PLATES_ROUTE.route,
  //     functionalComponent: () => (
  //       <LicensePlateInformationPanel />
  //     ),
  //   }
  // ],
  // },
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
            exclude_vehicle_types={NO_CAR_VEHICLES}
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
    iconClass: 'fa-solid fa-map-location-dot',
    childs: [
      ...Array.from(
        MEXICO_STATE_CODE_TO_STATE_NAME,
        ([stateCode, stateName]) => ({
          title: stateName,
          idChild: stateCode,
          route: `${BY_STATES_ROUTE.route}/${stateCode}`,
          functionalComponent: () => (
            <SingleRegionLicensePlatesPanel regionCode={stateCode} />
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
        vehicle_types={MotorcycleVehicle.types}
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
        vehicle_types={BicycleVehicle.types}
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
        vehicle_types={FrontierVehicle.types}
        hideStateName={false}
        hideYears={false}
        hideVehicleType={true}
      />
    ),
  },
  {
    title: NATIONAL_ROUTE.title,
    route: NATIONAL_ROUTE.route,
    iconClass: 'fa-solid fa-flag',
    functionalComponent: () => <FederalLicensePlatesPanel />,
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
    hidden: true,
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
