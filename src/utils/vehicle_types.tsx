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
  types: ['TAXI', 'FRONTIER-TAXI'],
  icon: <i className={`VehicleIcon ${taxiVehicleClassName}`} />,
};

const carVehicleClassName = 'fa-solid fa-car-side';
export const CarVehicle: VehicleType = {
  iconClassName: carVehicleClassName,
  types: ['ANTIQUE-CAR', 'COMMERCIAL-CAR', 'PRIVATE-CAR', 'CAR', 'RENTAL'],
  icon: <i className={`VehicleIcon ${carVehicleClassName}`} />,
};

const bicycleVehicleClassName = 'fa-solid fa-bicycle';
export const BicycleVehicle: VehicleType = {
  iconClassName: bicycleVehicleClassName,
  types: ['BICYCLE', 'TRICYCLE', 'BICYCLE-POLICE'],
  icon: <i className={`VehicleIcon ${bicycleVehicleClassName}`} />,
};

const motorcycleVehicleClassName = 'fa-solid fa-motorcycle';
export const MotorcycleVehicle: VehicleType = {
  iconClassName: motorcycleVehicleClassName,
  types: ['MOTORCYCLE', 'MOTORCYCLE-POLICE', 'MOTORCYCLE-AMBULANCE'],
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
    'FRONTIER-BUS',
    'TOURIST',
  ],
  icon: <i className={`VehicleIcon ${busVehicleClassName}`} />,
};

const truckVehicleClassName = 'fa-solid fa-truck';
export const TruckVehicle: VehicleType = {
  iconClassName: truckVehicleClassName,
  types: ['COMMERCIAL-TRUCK', 'PRIVATE-TRUCK', 'TRUCK', 'FRONTIER-TRUCK'],
  icon: <i className={`VehicleIcon ${truckVehicleClassName}`} />,
};

const trailerVehicleClassName = 'fa-solid fa-trailer';
export const TrailerVehicle: VehicleType = {
  iconClassName: trailerVehicleClassName,
  types: [
    'COMMERCIAL-TRAILER',
    'PRIVATE-TRAILER',
    'TRAILER',
    'FRONTIER-TRAILER',
  ],
  icon: <i className={`VehicleIcon ${trailerVehicleClassName}`} />,
};

const transferVehicleClassName = 'fa-solid fa-truck-moving';
export const TransferVehicle: VehicleType = {
  iconClassName: transferVehicleClassName,
  types: ['TRANSFER', 'FRONTIER-TRANSFER'],
  icon: <i className={`VehicleIcon ${transferVehicleClassName}`} />,
};

const policeVehicleClassName = 'fa-solid fa-person-military-rifle';
export const PoliceVehicle: VehicleType = {
  iconClassName: policeVehicleClassName,
  types: [
    'POLICE',
    'STATE-POLICE',
    'MUNICIPAL-POLICE',
    'FEDERAL-POLICE',
    'MINISTERIAL-POLICE',
    'MEXICAN-NAVY',
    'FRONTIER-POLICE',
    'HIGHWAY-PATROL',
    'BICYCLE-POLICE',
    'MOTORCYCLE-POLICE',
  ],
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
  iconClassName: frontierVehicleClassName,
  types: [
    'FRONTIER',
    'FRONTIER-CAR',
    'FRONTIER-TRAILER',
    'FRONTIER-TRUCK',
    'FRONTIER-TAXI',
    'FRONTIER-BUS',
    'FRONTIER-TRANSFER',
  ],
  icon: <i className={`VehicleIcon ${frontierVehicleClassName}`} />,
};

const unknownVehicleClassName = 'fa-solid fa-question';
export const UnknownVehicle: VehicleType = {
  iconClassName: unknownVehicleClassName,
  types: ['UNKNOWN'],
  icon: <i className={`VehicleIcon ${unknownVehicleClassName}`} />,
};

const diplomaticVehicleClassName = 'fa-solid fa-handshake';
export const DiplomaticVehicle: VehicleType = {
  iconClassName: diplomaticVehicleClassName,
  types: ['CONSULAR', 'DIPLOMAT', 'INTERNATIONAL'],
  icon: <i className={`VehicleIcon ${diplomaticVehicleClassName}`} />,
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
  TransferVehicle,
  DiplomaticVehicle,
  MetropolitanVehicle,
];

const aux: Map<string, JSX.Element>[] = Vechicles.map(
  (v) => new Map<string, JSX.Element>(v.types.map((t) => [t, v.icon])),
);
const aux_entries = aux.map((a) => [...a.entries()]);
export const VehicleIconsMap = new Map(
  aux_entries.reduce((all, a) => [...all, ...a], []),
);
