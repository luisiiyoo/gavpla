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
      {Vehicles.TruckVehicle.icon} &nbsp;
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
      {Vehicles.TaxiVehicle.icon} &nbsp;
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
export const FederalHeader = () => {
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
  DFPrivateBus?: React.FC;
  PrivateTrailer: React.FC<PlateInfoProps>;
  DFPrivateTrailer?: React.FC;
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

  const hasPrivateCar = !!figures.PrivateCar || !!figures.DFPrivateCar;
  const hasTruck = !!figures.Truck || !!figures.DFTruck;
  const hasTaxi = !!figures.Taxi || !!figures.DFTaxi;
  const hasCommercialBus = !!figures.CommercialBus || !!figures.DFCommercialBus;
  const hasCommercialTruck =
    !!figures.CommercialTruck || !!figures.DFCommercialTruck;
  const hasCommercialTrailer =
    !!figures.CommercialTrailer || !!figures.DFCommercialTrailer;
  const hasPrivateBus = !!figures.PrivateBus || !!figures.DFPrivateBus;
  const hasPrivateTrailer =
    !!figures.PrivateTrailer || !!figures.DFPrivateTrailer;
  const hasDealer = !!figures.Dealer;
  const hasFrontier = !!figures.Frontier;
  const hasFederal = !!figures.FederalSPF;
  return (
    <div className="LicensePlateFigures">
      {/* PrivateCar - Truck - Taxi */}
      <table>
        <thead>
          <tr>
            {hasPrivateCar && (
              <th>
                <PrivateCarHeader />
              </th>
            )}
            {hasTruck && (
              <th>
                <TruckHeader />
              </th>
            )}
            {hasTaxi && (
              <th>
                <TaxiHeader />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {hasPrivateCar && (
              <td>
                <PrivateCarHeader />
                {!!figures.PrivateCar && (
                  <figures.PrivateCar stateCode={stateCode} />
                )}
                {!!figures.DFPrivateCar && <figures.DFPrivateCar />}
              </td>
            )}
            {hasTruck && (
              <td>
                <TruckHeader />
                {!!figures.Truck && <figures.Truck stateCode={stateCode} />}
                {!!figures.DFTruck && <figures.DFTruck />}
              </td>
            )}
            {hasTaxi && (
              <td>
                <TaxiHeader />
                {!!figures.Taxi && <figures.Taxi stateCode={stateCode} />}
                {!!figures.DFTaxi && <figures.DFTaxi />}
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* CommercialBus - CommercialTruck - CommercialTrailer */}
      <table>
        <thead>
          <tr>
            {hasCommercialBus && (
              <th>
                <CommercialBusHeader />
              </th>
            )}
            {!!hasCommercialTruck && (
              <th>
                <CommercialTruckHeader />
              </th>
            )}
            {!!hasCommercialTrailer && (
              <th>
                <CommercialTrailerHeader />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {hasCommercialBus && (
              <td>
                <CommercialBusHeader />
                {!!figures.CommercialBus && (
                  <figures.CommercialBus stateCode={stateCode} />
                )}
                {!!figures.DFCommercialBus && <figures.DFCommercialBus />}
              </td>
            )}
            {hasCommercialTruck && (
              <td>
                <CommercialTruckHeader />
                {!!figures.CommercialTruck && (
                  <figures.CommercialTruck stateCode={stateCode} />
                )}
                {!!figures.CommercialTruck && <figures.DFCommercialTruck />}
              </td>
            )}
            {hasCommercialTrailer && (
              <td>
                <CommercialTrailerHeader />
                {!!figures.CommercialTrailer && (
                  <figures.CommercialTrailer stateCode={stateCode} />
                )}
                {!!figures.CommercialTrailer && <figures.DFCommercialTrailer />}
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* PrivateBus - PrivateTrailer - Dealer */}
      <table>
        <thead>
          <tr>
            {hasPrivateBus && (
              <th>
                <PrivateBusHeader />
              </th>
            )}
            {hasPrivateTrailer && (
              <th>
                <PrivateTrailerHeader />
              </th>
            )}
            {hasDealer && (
              <th>
                <DealerHeader />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {hasPrivateBus && (
              <td>
                <PrivateBusHeader />
                {!!figures.PrivateBus && (
                  <figures.PrivateBus stateCode={stateCode} />
                )}
                {!!figures.DFPrivateBus && <figures.DFPrivateBus />}
              </td>
            )}
            {hasPrivateTrailer && (
              <td>
                <PrivateTrailerHeader />
                {!!figures.PrivateTrailer && (
                  <figures.PrivateTrailer stateCode={stateCode} />
                )}
                {!!figures.DFPrivateTrailer && <figures.DFPrivateTrailer />}
              </td>
            )}
            {hasDealer && (
              <td>
                <DealerHeader />
                <figures.Dealer stateCode={stateCode} />
              </td>
            )}
          </tr>
        </tbody>
      </table>

      {/* Frontier */}
      {hasFrontier && (
        <table>
          <thead>
            <tr>
              <th>
                <FrontierHeader />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FrontierHeader />
                <figures.Frontier stateCode={frontierStateCode} />
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* FederalSPF */}
      {hasFederal && (
        <table>
          <thead>
            <tr>
              <th>
                <FederalHeader />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FederalHeader />
                {!!figures.FederalSPF && <figures.FederalSPF />}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LicensePlateFigures;
