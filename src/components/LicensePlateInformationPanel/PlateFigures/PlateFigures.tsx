import React from 'react';
import * as Vehicles from 'src/utils/vehicle_types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { transalateVehicleType } from 'src/utils';
import { useSelector } from 'react-redux';

export interface PlateInfoProps {
  stateCode?: string;
}

export const PrivateCarHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.CarVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'PRIVATE-CAR', vehicleTypes)}
    </span>
  );
};
export const TruckHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.CarVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'TRUCK', vehicleTypes)}
    </span>
  );
};

export const TaxiHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.CarVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'TAXI', vehicleTypes)}
    </span>
  );
};

export const CommercialBusHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.BusVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'COMMERCIAL-BUS', vehicleTypes)}
    </span>
  );
};
export const CommercialTruckHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.TruckVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'COMMERCIAL-TRUCK', vehicleTypes)}
    </span>
  );
};
export const CommercialTrailerHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.TrailerVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'COMMERCIAL-TRAILER', vehicleTypes)}
    </span>
  );
};

export const PrivateBusHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.BusVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'PRIVATE-BUS', vehicleTypes)}
    </span>
  );
};

export const PrivateTrailerHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.TrailerVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'PRIVATE-TRAILER', vehicleTypes)}
    </span>
  );
};

export const DealerHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.DealerVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'DEALER', vehicleTypes)}
    </span>
  );
};

export const FrontierHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.FrontierVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'FRONTIER', vehicleTypes)}
    </span>
  );
};
export const FederalSPFHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.FederalVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'FEDERAL', vehicleTypes)}
    </span>
  );
};
