import React, { useState, useEffect } from 'react';
import * as Vehicles from 'src/utils/vehicle_types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import {
  randomFrontierStateCode,
  randomStateCode,
  transalateVehicleType,
} from 'src/utils';
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
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.FederalVehicle.icon} &nbsp;
      {'FEDERAL'}
    </span>
  );
};

export interface FiguresType {
  PrivateCar: React.FC<PlateInfoProps>;
  DFPrivateCar: React.FC;
  Truck: React.FC<PlateInfoProps>;
  DFTruck: React.FC;
  Taxi: React.FC<PlateInfoProps>;
  DFTaxi: React.FC;
  CommercialBus: React.FC<PlateInfoProps>;
  DFCommercialBus: React.FC;
  CommercialTruck: React.FC<PlateInfoProps>;
  DFCommercialTruck: React.FC;
  CommercialTrailer: React.FC<PlateInfoProps>;
  DFCommercialTrailer: React.FC;
  PrivateBus: React.FC<PlateInfoProps>;
  PrivateTrailer: React.FC<PlateInfoProps>;
  Dealer: React.FC<PlateInfoProps>;
  Frontier: React.FC<PlateInfoProps>;
  FederalSPF: React.FC;
}

export interface LicensePlateFigures {
  figures: FiguresType;
}

export const LicensePlateFigures: React.FC<LicensePlateFigures> = ({
  figures,
}) => {
  const [stateCode, setStateCode] = useState(randomStateCode());
  const [frontierStateCode, setFrontierStateCode] = useState(
    randomFrontierStateCode(),
  );

  useEffect(() => {
    const updateStateCode = () => {
      setStateCode(randomStateCode());
      setFrontierStateCode(randomFrontierStateCode());
    };

    const interval = setInterval(updateStateCode, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="LicensePlateFigures">
      {/* <h4>1972 - 1973</h4> */}
      {/* PrivateCar - Truck - Taxi */}
      <table>
        <thead>
          <tr>
            <th>
              <PrivateCarHeader />
            </th>
            <th>
              <TruckHeader />
            </th>
            <th>
              <TaxiHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PrivateCarHeader />
              <figures.PrivateCar stateCode={stateCode} />
              <figures.DFPrivateCar />
            </td>
            <td>
              <TruckHeader />
              <figures.Truck stateCode={stateCode} />
              <figures.DFTruck />
            </td>
            <td>
              <TaxiHeader />
              <figures.Taxi stateCode={stateCode} />
              <figures.DFTaxi />
            </td>
          </tr>
        </tbody>
      </table>
      {/* CommercialBus - CommercialTruck - CommercialTrailer */}
      <table>
        <thead>
          <tr>
            <th>
              <CommercialBusHeader />
            </th>
            <th>
              <CommercialTruckHeader />
            </th>
            <th>
              <CommercialTrailerHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CommercialBusHeader />
              <figures.CommercialBus stateCode={stateCode} />
              <figures.DFCommercialBus />
            </td>
            <td>
              <CommercialTruckHeader />
              <figures.CommercialTruck stateCode={stateCode} />
              <figures.DFCommercialTruck />
            </td>
            <td>
              <CommercialTrailerHeader />
              <figures.CommercialTrailer stateCode={stateCode} />
              <figures.DFCommercialTrailer />
            </td>
          </tr>
        </tbody>
      </table>
      {/* PrivateBus - PrivateTrailer - Dealer */}
      <table>
        <thead>
          <tr>
            <th>
              <PrivateBusHeader />
            </th>
            <th>
              <PrivateTrailerHeader />
            </th>
            <th>
              <DealerHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PrivateBusHeader />
              <figures.PrivateBus stateCode={stateCode} />
            </td>
            <td>
              <PrivateTrailerHeader />
              <figures.PrivateTrailer stateCode={stateCode} />
            </td>
            <td>
              <DealerHeader />
              <figures.Dealer stateCode={stateCode} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Frontier - FederalSPF */}
      <table>
        <thead>
          <tr>
            <th>
              <FrontierHeader />
            </th>
            <th>
              <FederalSPFHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FrontierHeader />
              <figures.Frontier stateCode={frontierStateCode} />
            </td>
            <td>
              <FederalSPFHeader />
              <figures.FederalSPF />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LicensePlateFigures;
