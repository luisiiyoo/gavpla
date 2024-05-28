import React from 'react';

interface VehicleType {
  types: string[];
  iconClassName: string;
  icon: JSX.Element;
}

const dealerVehicleClassName = 'fa-solid fa-car-on';
export const DealerVehicle: VehicleType = {
  iconClassName: dealerVehicleClassName,
  types: ['DEALER', 'PROVISIONAL'],
  icon: <i className={`VehicleIcon ${dealerVehicleClassName}`} />,
};

const taxiVehicleClassName = 'fa-solid fa-taxi';
export const TaxiVehicle: VehicleType = {
  iconClassName: taxiVehicleClassName,
  types: ['TAXI'],
  icon: <i className={`VehicleIcon ${taxiVehicleClassName}`} />,
};

const carVehicleClassName = 'fa-solid fa-car-side';
export const CarVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-car-side',
  types: [
    'ANTIQUE-CAR',
    'COMMERCIAL-CAR',
    'PRIVATE-CAR',
    'SPF-CAR',
    'SPF-RENTAL',
  ],
  icon: <i className={`VehicleIcon ${carVehicleClassName}`} />,
};

const bicycleVehicleClassName = 'fa-solid fa-bicycle';
export const BicycleVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-bicycle',
  types: ['BICYCLE', 'TRICYCLE'],
  icon: <i className={`VehicleIcon ${bicycleVehicleClassName}`} />,
};

const motorcycleVehicleClassName = 'fa-solid fa-motorcycle';
export const MotorcycleVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-motorcycle',
  types: ['MOTORCYCLE'],
  icon: <i className={`VehicleIcon ${motorcycleVehicleClassName}`} />,
};

const ecoVehicleClassName = 'fa-solid fa-charging-station';
export const EcoVehicle: VehicleType = {
  iconClassName: ecoVehicleClassName,
  types: ['ECO-FRIENDLY'],
  icon: <i className={`VehicleIcon ${ecoVehicleClassName}`} />,
};

const handicappedVehicleClassName = 'fa-solid fa-wheelchair-move';
export const HandicappedVehicle: VehicleType = {
  iconClassName: handicappedVehicleClassName,
  types: ['HANDICAPPED'],
  icon: <i className={`VehicleIcon ${handicappedVehicleClassName}`} />,
};

const busVehicleClassName = 'fa-solid fa-bus';
export const BusVehicle: VehicleType = {
  iconClassName: busVehicleClassName,
  types: [
    'BUS',
    'COMMERCIAL-BUS',
    'MICROBUS',
    'PRIVATE-BUS',
    'SCT-BUS',
    'SPF-BUS',
  ],
  icon: <i className={`VehicleIcon ${busVehicleClassName}`} />,
};

const truckVehicleClassName = 'fa-solid fa-truck';
export const TruckVehicle: VehicleType = {
  iconClassName: truckVehicleClassName,
  types: [
    'COMMERCIAL-TRUCK',
    'PRIVATE-TRUCK',
    'SAF-TRUCK',
    'SCT-TRUCK',
    'SPF-TRUCK',
    'TRUCK',
  ],
  icon: <i className={`VehicleIcon ${truckVehicleClassName}`} />,
};

const trailerVehicleClassName = 'fa-solid fa-trailer';
export const TrailerVehicle: VehicleType = {
  iconClassName: trailerVehicleClassName,
  types: [
    'COMMERCIAL-TRAILER',
    'PRIVATE-TRAILER',
    'SAF-TRAILER',
    'SCT-TRAILER',
    'SPF-TRAILER',
    'TRAILER',
  ],
  icon: <i className={`VehicleIcon ${trailerVehicleClassName}`} />,
};

const policeVehicleClassName = 'fa-solid fa-person-military-rifle';
export const PoliceVehicle: VehicleType = {
  iconClassName: policeVehicleClassName,
  types: ['FEDERAL-POLICE', 'MEXICAN-NAVY', 'MINISTERIAL-POLICE', 'POLICE'],
  icon: <i className={`VehicleIcon ${policeVehicleClassName}`} />,
};

const ambulanceVehicleClassName = 'fa-solid fa-truck-medical';
export const AmbulanceVehicle: VehicleType = {
  iconClassName: ambulanceVehicleClassName,
  types: ['AMBULANCE', 'CIVIL-PROTECTION', 'FIREFIGHTER'],
  icon: <i className={`VehicleIcon ${ambulanceVehicleClassName}`} />,
};

const frontierVehicleClassName = 'fa-solid fa-arrow-down-up-across-line';
export const FrontierVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-arrow-down-up-across-line',
  types: ['FRONTIER'],
  icon: <i className={`VehicleIcon ${frontierVehicleClassName}`} />,
};

const unknownVehicleClassName = 'fa-solid fa-question';
export const UnknownVehicle: VehicleType = {
  iconClassName: unknownVehicleClassName,
  types: ['UNKNOWN'],
  icon: <i className={`VehicleIcon ${unknownVehicleClassName}`} />,
};

const federalVehicleClassName = 'fa-solid fa-flag';
export const FederalVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-flag',
  types: [
    'SAF',
    'SAF-TRAILER',
    'SCT',
    'SCT-BUS',
    'SCT-TRAILER',
    'SCT-TRANSFER',
    'SCT-TRUCK',
    'SET',
    'SET-TOURIST',
    'SPF',
    'SPF-BUS',
    'SPF-CAR',
    'SPF-FRONTIER',
    'SPF-RENTAL',
    'SPF-TRAILER',
    'SPF-TRUCK',
    'SRE',
    'SRE-CONSULAR',
    'SRE-DIPLOMAT',
  ],
  icon: <i className={`VehicleIcon ${federalVehicleClassName}`} />,
};

const metropolitanVehicleClassName = 'fa-solid fa-city';
export const MetropolitanVehicle: VehicleType = {
  iconClassName: metropolitanVehicleClassName,
  types: ['METROPOLITAN'],
  icon: <i className={`VehicleIcon ${metropolitanVehicleClassName}`} />,
};

export const Vechicles: VehicleType[] = [
  DealerVehicle,
  TaxiVehicle,
  CarVehicle,
  BicycleVehicle,
  MotorcycleVehicle,
  EcoVehicle,
  HandicappedVehicle,
  BusVehicle,
  TruckVehicle,
  TrailerVehicle,
  PoliceVehicle,
  AmbulanceVehicle,
  FrontierVehicle,
  UnknownVehicle,
  FederalVehicle,
  MetropolitanVehicle,
];

const aux: Map<string, JSX.Element>[] = Vechicles.map(
  (v) => new Map<string, JSX.Element>(v.types.map((t) => [t, v.icon])),
);
const aux_entries = aux.map((a) => [...a.entries()]);
export const VehicleIconsMap = new Map(
  aux_entries.reduce((all, a) => [...all, ...a], []),
);
