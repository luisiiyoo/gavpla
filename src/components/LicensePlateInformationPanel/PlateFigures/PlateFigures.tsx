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

export const ProvisionalHeader = () => {
  const { languageCode, vehicleTypes }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.DealerVehicle.icon} &nbsp;
      {transalateVehicleType(languageCode, 'PROVISIONAL', vehicleTypes)}
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
      {'FEDERAL - S.P.F.'}
    </span>
  );
};
export const FederalSETHeader = () => {
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.FederalVehicle.icon} &nbsp;
      {'FEDERAL - S.E.T.'}
    </span>
  );
};

export const FederalSCTHeader = () => {
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.FederalVehicle.icon} &nbsp;
      {'FEDERAL - S.C.T.'}
    </span>
  );
};

export const FederalSAFHeader = () => {
  return (
    <span className="VehicleTypeHeader">
      {Vehicles.FederalVehicle.icon} &nbsp;
      {'FEDERAL - S.A.F.'}
    </span>
  );
};

export interface FiguresContentType {
  PrivateCar: React.FC<PlateInfoProps>;
  PrivateCar2?: React.FC<PlateInfoProps>;
  DFPrivateCar: React.FC;
  Truck: React.FC<PlateInfoProps>;
  DFTruck?: React.FC;
  Taxi: React.FC<PlateInfoProps>;
  Taxi2?: React.FC<PlateInfoProps>;
  DFTaxi: React.FC;
  DFTaxi2?: React.FC;
  CommercialBus: React.FC<PlateInfoProps>;
  CommercialBus2?: React.FC<PlateInfoProps>;
  DFCommercialBus: React.FC;
  CommercialTruck: React.FC<PlateInfoProps>;
  CommercialTruck2?: React.FC<PlateInfoProps>;
  DFCommercialTruck: React.FC;
  CommercialTrailer: React.FC<PlateInfoProps>;
  CommercialTrailer2?: React.FC<PlateInfoProps>;
  DFCommercialTrailer: React.FC;
  PrivateBus: React.FC<PlateInfoProps>;
  DFPrivateBus?: React.FC;
  PrivateTrailer: React.FC<PlateInfoProps>;
  DFPrivateTrailer?: React.FC;
  Dealer: React.FC<PlateInfoProps>;
  Dealer2?: React.FC<PlateInfoProps>;
  Provisional?: React.FC<PlateInfoProps>;
  Frontier?: React.FC<PlateInfoProps>;
  FederalSPF?: React.FC;
  FederalSPFCar?: React.FC;
  FederalSPFBus?: React.FC;
  FederalSPFTrailer?: React.FC;
  FederalSPFTruck?: React.FC;
  FederalSPFRental?: React.FC;
  FederalSPFRental2?: React.FC;
  FederalSPFBorder?: React.FC;
  FederalSET?: React.FC;
  FederalSCT?: React.FC;
  FederalSAF?: React.FC;
  FederalSAFBus?: React.FC;
  FederalSAFTrailer?: React.FC;
}

export interface LicensePlateFigures {
  figures: FiguresContentType;
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

  const hasPrivateCar =
    !!figures.PrivateCar || !!figures.PrivateCar2 || !!figures.DFPrivateCar;
  const hasTruck = !!figures.Truck || !!figures.DFTruck;
  const hasTaxi =
    !!figures.Taxi || !!figures.Taxi2 || !!figures.DFTaxi || !!figures.DFTaxi2;
  const hasCommercialBus =
    !!figures.CommercialBus ||
    !!figures.CommercialBus2 ||
    !!figures.DFCommercialBus;
  const hasCommercialTruck =
    !!figures.CommercialTruck ||
    !!figures.CommercialTruck2 ||
    !!figures.DFCommercialTruck;
  const hasCommercialTrailer =
    !!figures.CommercialTrailer ||
    !!figures.CommercialTrailer2 ||
    !!figures.DFCommercialTrailer;
  const hasPrivateBus = !!figures.PrivateBus || !!figures.DFPrivateBus;
  const hasPrivateTrailer =
    !!figures.PrivateTrailer || !!figures.DFPrivateTrailer;
  const hasDealer =
    !!figures.Dealer || !!figures.Dealer2 || !!figures.Provisional;
  const hasFrontier = !!figures.Frontier;
  const hasFederalSPF =
    !!figures.FederalSPF ||
    !!figures.FederalSPFCar ||
    !!figures.FederalSPFBus ||
    !!figures.FederalSPFTruck ||
    !!figures.FederalSPFTrailer ||
    !!figures.FederalSPFRental ||
    !!figures.FederalSPFRental2 ||
    !!figures.FederalSPFBorder;
  const hasFederalSET = !!figures.FederalSET;
  const hasFederalSCT = !!figures.FederalSCT;
  const hasFederalSAF =
    !!figures.FederalSAF ||
    !!figures.FederalSAFBus ||
    !!figures.FederalSAFTrailer;
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
                {!!figures.PrivateCar2 && (
                  <figures.PrivateCar2 stateCode={stateCode} />
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
                {!!figures.Taxi2 && <figures.Taxi2 stateCode={stateCode} />}
                {!!figures.DFTaxi && <figures.DFTaxi />}
                {!!figures.DFTaxi2 && <figures.DFTaxi2 />}
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
                {!!figures.CommercialBus2 && (
                  <figures.CommercialBus2 stateCode={stateCode} />
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
                {!!figures.CommercialTruck2 && (
                  <figures.CommercialTruck2 stateCode={stateCode} />
                )}
                {!!figures.DFCommercialTruck && <figures.DFCommercialTruck />}
              </td>
            )}
            {hasCommercialTrailer && (
              <td>
                <CommercialTrailerHeader />
                {!!figures.CommercialTrailer && (
                  <figures.CommercialTrailer stateCode={stateCode} />
                )}
                {!!figures.CommercialTrailer2 && (
                  <figures.CommercialTrailer2 stateCode={stateCode} />
                )}
                {!!figures.CommercialTrailer && <figures.DFCommercialTrailer />}
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* PrivateBus - PrivateTrailer */}
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
          </tr>
        </tbody>
      </table>

      {/* Dealer - Provisional */}
      {hasDealer && (
        <table>
          <thead>
            <tr>
              {!!figures.Dealer && (
                <th>
                  <DealerHeader />
                </th>
              )}
              {!!figures.Provisional && (
                <th>
                  <ProvisionalHeader />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <DealerHeader />
                {!!figures.Dealer && <figures.Dealer stateCode={stateCode} />}
                {!!figures.Dealer2 && <figures.Dealer2 stateCode={stateCode} />}
                {!!figures.Provisional && (
                  <figures.Provisional stateCode={stateCode} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

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
                {!!figures.Frontier && (
                  <figures.Frontier stateCode={frontierStateCode} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* FederalSPF */}
      {hasFederalSPF && (
        <table>
          <thead>
            <tr>
              <th>
                <FederalSPFHeader />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FederalSPFHeader />
                {!!figures.FederalSPF && <figures.FederalSPF />}
                {!!figures.FederalSPFCar && (
                  <>
                    <span className="SubIcon">{Vehicles.CarVehicle.icon}</span>
                    <figures.FederalSPFCar />
                  </>
                )}
                {!!figures.FederalSPFTrailer && (
                  <>
                    <span className="SubIcon">
                      {Vehicles.TrailerVehicle.icon}
                    </span>
                    <figures.FederalSPFTrailer />
                  </>
                )}
                {!!figures.FederalSPFTruck && (
                  <>
                    <span className="SubIcon">
                      {Vehicles.TruckVehicle.icon}
                    </span>
                    <figures.FederalSPFTruck />
                  </>
                )}
                {!!figures.FederalSPFBus && (
                  <>
                    <span className="SubIcon">{Vehicles.BusVehicle.icon}</span>
                    <figures.FederalSPFBus />
                  </>
                )}
                {!!figures.FederalSPFRental && (
                  <>
                    <span className="SubIcon">
                      {Vehicles.TruckVehicle.icon}
                    </span>
                    <figures.FederalSPFRental />
                  </>
                )}
                {!!figures.FederalSPFRental2 && (
                  <>
                    <span className="SubIcon">
                      {Vehicles.TrailerVehicle.icon}
                    </span>
                    <figures.FederalSPFRental2 />
                  </>
                )}
                {!!figures.FederalSPFBorder && (
                  <>
                    <span className="SubIcon">
                      {Vehicles.FrontierVehicle.icon}
                    </span>
                    <figures.FederalSPFBorder />
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {/* FederalSET */}
      {hasFederalSET && (
        <table>
          <thead>
            <tr>
              <th>
                <FederalSETHeader />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FederalSETHeader />
                {!!figures.FederalSET && <figures.FederalSET />}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {/* FederalSCT */}
      {hasFederalSCT && (
        <table>
          <thead>
            <tr>
              <th>
                <FederalSCTHeader />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FederalSCTHeader />
                {!!figures.FederalSCT && <figures.FederalSCT />}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {/* FederalSAF */}
      {hasFederalSAF && (
        <table>
          <thead>
            <tr>
              <th>
                <FederalSAFHeader />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FederalSAFHeader />
                {!!figures.FederalSAF && <figures.FederalSAF />}
                {!!figures.FederalSAFBus && (
                  <>
                    <span className="SubIcon">{Vehicles.BusVehicle.icon}</span>
                    <figures.FederalSAFBus />
                  </>
                )}
                {!!figures.FederalSAFTrailer && (
                  <>
                    <span className="SubIcon">
                      {Vehicles.TrailerVehicle.icon}
                    </span>
                    <figures.FederalSAFTrailer />
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LicensePlateFigures;
