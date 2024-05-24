interface VehicleType {
  types: string[];
  iconClassName: string;
}

export const DealerVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-car-on',
  types: ['DEALER', 'PROVISIONAL'],
};

export const TaxiVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-taxi',
  types: ['TAXI'],
};

export const CarVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-car-side',
  types: [
    'ANTIQUE-CAR',
    'COMMERCIAL-CAR',
    'PRIVATE-CAR',
    'SPF-CAR',
    'SPF-RENTAL',
  ],
};

export const BicycleVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-bicycle',
  types: ['BICYCLE', 'TRICYCLE'],
};

export const MotorcycleVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-motorcycle',
  types: ['MOTORCYCLE'],
};

export const EcoVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-charging-station',
  types: ['ECO-FRIENDLY'],
};

export const HandicappedVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-wheelchair-move',
  types: ['HANDICAPPED'],
};

export const BusVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-bus',
  types: [
    'BUS',
    'COMMERCIAL-BUS',
    'MICROBUS',
    'PRIVATE-BUS',
    'SCT-BUS',
    'SPF-BUS',
  ],
};

export const TruckVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-truck',
  types: [
    'COMMERCIAL-TRUCK',
    'PRIVATE-TRUCK',
    'SAF-TRUCK',
    'SCT-TRUCK',
    'SPF-TRUCK',
    'TRUCK',
  ],
};

export const TrailerVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-trailer',
  types: [
    'COMMERCIAL-TRAILER',
    'PRIVATE-TRAILER',
    'SAF-TRAILER',
    'SCT-TRAILER',
    'SPF-TRAILER',
    'TRAILER',
  ],
};

export const PoliceVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-person-military-rifle',
  types: ['FEDERAL-POLICE', 'MEXICAN-NAVY', 'MINISTERIAL-POLICE', 'POLICE'],
};

export const AmbulanceVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-truck-medical',
  types: ['AMBULANCE', 'CIVIL-PROTECTION', 'FIREFIGHTER'],
};

export const FrontierVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-arrow-down-up-across-line',
  types: ['FRONTIER'],
};

export const UnknownVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-question',
  types: ['UNKNOWN'],
};

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
};

export const MetropolitanVehicle: VehicleType = {
  iconClassName: 'fa-solid fa-city',
  types: ['METROPOLITAN'],
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

const aux: Map<string, string>[] = Vechicles.map(
  (v) => new Map<string, string>(v.types.map((t) => [t, v.iconClassName])),
);
const aux_entries = aux.map((a) => [...a.entries()]);
export const VehicleIconsMap = new Map(
  aux_entries.reduce((all, a) => [...all, ...a], []),
);
