import React, { useState } from 'react';
import { TRANSLATIONS } from 'src/language/language';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import {
  AmbulanceVehicle,
  BicycleVehicle,
  BusVehicle,
  CarVehicle,
  DealerVehicle,
  EcoVehicle,
  FrontierVehicle,
  HandicappedVehicle,
  MotorcycleVehicle,
  PoliceVehicle,
  TaxiVehicle,
  TrailerVehicle,
  TruckVehicle,
  UnknownVehicle,
} from 'src/utils/vehicle_types';

export interface VehicleOptionProps {
  stateValue: boolean;
  stateHandler: () => void;
  iconClassName: string;
}

const VehicleOption = ({
  stateValue,
  stateHandler,
  iconClassName,
}: VehicleOptionProps) => {
  return (
    <FormGroup switch>
      <Input type="switch" checked={stateValue} onChange={stateHandler} />
      <Label check>
        <i className={iconClassName} />
      </Label>
    </FormGroup>
  );
};

interface VehicleTypeOption {
  iconClassName: string;
  stateValue: boolean;
  setStateValue: (val: boolean) => void;
  types: string[];
}
interface VehicleTypeOptions {
  [key: string]: VehicleTypeOption;
}

export interface VehicleOptionsPanelProps {
  excludedVehicleTypes: Set<string>;
  setExcludedVehicleTypes: (selectedTypes: Set<string>) => void;
}

export const VehicleOptionsPanel = ({
  excludedVehicleTypes,
  setExcludedVehicleTypes,
}: VehicleOptionsPanelProps) => {
  const { languageCode }: StateType = useSelector((state) => state.main);
  const translation = TRANSLATIONS.Search[languageCode];

  const [searchDealer, setSearchDealer] = useState<boolean>(true);

  const [searchCars, setSearchCars] = useState<boolean>(true);

  const [searchBicycles, setSearchBicycles] = useState<boolean>(false);

  const [searchMotorcycles, setSearchMotorcycles] = useState<boolean>(false);

  const [searchEcoFriendly, setSearchEcoFriendly] = useState<boolean>(true);

  const [searchHandicapped, setSearchHandicapped] = useState<boolean>(true);

  const [searchBus, setSearchBus] = useState<boolean>(true);

  const [searchTaxi, setSearchTaxi] = useState<boolean>(true);

  const [searchTruck, setSearchTruck] = useState<boolean>(true);

  const [searchTrailer, setSearchTrailer] = useState<boolean>(true);

  const [searchPolice, setSearchPolice] = useState<boolean>(true);

  const [searchAmbulance, setSearchAmbulance] = useState<boolean>(true);

  const [searchFrontierVehicles, setSearchFrontierVehicles] = useState<boolean>(
    true,
  );

  // const [searchFederalVehicles, setSearchFederalVehicles] = useState<boolean>(
  //   true,
  // );

  const [searchUnknown, setSearchUnknown] = useState<boolean>(true);

  // Control vars
  const [selectAllVechicleTypes, setSelectAllVechicleTypes] = useState(true);
  const vehicleOptions: VehicleTypeOptions = {
    'DEALER-TYPES': {
      iconClassName: DealerVehicle.iconClassName,
      stateValue: searchDealer,
      setStateValue: setSearchDealer,
      types: DealerVehicle.types,
    },
    'CAR-TYPES': {
      iconClassName: CarVehicle.iconClassName,
      stateValue: searchCars,
      setStateValue: setSearchCars,
      types: CarVehicle.types,
    },
    'BICYCLE-TYPES': {
      iconClassName: BicycleVehicle.iconClassName,
      stateValue: searchBicycles,
      setStateValue: setSearchBicycles,
      types: BicycleVehicle.types,
    },
    'MOTORCYCLE-TYPES': {
      iconClassName: MotorcycleVehicle.iconClassName,
      stateValue: searchMotorcycles,
      setStateValue: setSearchMotorcycles,
      types: MotorcycleVehicle.types,
    },
    'ECO-TYPES': {
      iconClassName: EcoVehicle.iconClassName,
      stateValue: searchEcoFriendly,
      setStateValue: setSearchEcoFriendly,
      types: EcoVehicle.types,
    },
    'HANDICAPPED-TYPES': {
      iconClassName: HandicappedVehicle.iconClassName,
      stateValue: searchHandicapped,
      setStateValue: setSearchHandicapped,
      types: HandicappedVehicle.types,
    },
    'BUS-TYPES': {
      iconClassName: BusVehicle.iconClassName,
      stateValue: searchBus,
      setStateValue: setSearchBus,
      types: BusVehicle.types,
    },
    'TAXI-TYPES': {
      iconClassName: TaxiVehicle.iconClassName,
      stateValue: searchTaxi,
      setStateValue: setSearchTaxi,
      types: TaxiVehicle.types,
    },
    'TRUCK-TYPES': {
      iconClassName: TruckVehicle.iconClassName,
      stateValue: searchTruck,
      setStateValue: setSearchTruck,
      types: TruckVehicle.types,
    },
    'TRAILER-TYPES': {
      iconClassName: TrailerVehicle.iconClassName,
      stateValue: searchTrailer,
      setStateValue: setSearchTrailer,
      types: TrailerVehicle.types,
    },
    'POLICE-TYPES': {
      iconClassName: PoliceVehicle.iconClassName,
      stateValue: searchPolice,
      setStateValue: setSearchPolice,
      types: PoliceVehicle.types,
    },
    'AMBULANCE-TYPES': {
      iconClassName: AmbulanceVehicle.iconClassName,
      stateValue: searchAmbulance,
      setStateValue: setSearchAmbulance,
      types: AmbulanceVehicle.types,
    },
    'FRONTIER-TYPES': {
      iconClassName: FrontierVehicle.iconClassName,
      stateValue: searchFrontierVehicles,
      setStateValue: setSearchFrontierVehicles,
      types: FrontierVehicle.types,
    },
    // 'FEDERAL-TYPES': {
    //   iconClassName: FederalVehicle.iconClassName,
    //   stateValue: searchFederalVehicles,
    //   setStateValue: setSearchFederalVehicles,
    //   types: FederalVehicle.types,
    // },
    'UNKNOWN-TYPES': {
      iconClassName: UnknownVehicle.iconClassName,
      stateValue: searchUnknown,
      setStateValue: setSearchUnknown,
      types: UnknownVehicle.types,
    },
  };

  const handleVechileFilter = (flag: boolean, types: string[]) => {
    const newExcluded = new Set(excludedVehicleTypes);
    if (!flag) {
      types.forEach((item) => newExcluded.add(item));
    } else {
      types.forEach((item) => newExcluded.delete(item));
    }
    setExcludedVehicleTypes(newExcluded);
  };

  return (
    <div className="OptionsPanel-VehicleTypes">
      <h4>{translation.OptionsPanel.titleVehicleSelection}</h4>
      <Form className="OptionsPanel-MainChoice">
        <FormGroup switch>
          <Input
            type="switch"
            checked={selectAllVechicleTypes}
            onChange={() => {
              const newVal = !selectAllVechicleTypes;
              if (newVal) {
                setExcludedVehicleTypes(new Set());
              } else {
                setExcludedVehicleTypes(
                  new Set(
                    Object.values(vehicleOptions)
                      .map((val) => val.types)
                      .flat(1),
                  ),
                );
              }
              Object.values(vehicleOptions).forEach((val) =>
                val.setStateValue(newVal),
              );
              setSelectAllVechicleTypes(newVal);
            }}
          />
          <Label check>
            {selectAllVechicleTypes
              ? translation.OptionsPanel.deselectAllVehicleTypes
              : translation.OptionsPanel.selectAllVehicleTypes}
          </Label>
        </FormGroup>
      </Form>

      <Form className="OptionsPanel-FormVehicleTypes">
        {Object.keys(vehicleOptions)
          .sort((a, b) => a.localeCompare(b))
          .map((keyType) => {
            const item: VehicleTypeOption = vehicleOptions[keyType];
            return (
              <VehicleOption
                key={keyType}
                iconClassName={item.iconClassName}
                stateValue={item.stateValue}
                stateHandler={() => {
                  const newVal = !item.stateValue;
                  item.setStateValue(newVal);
                  handleVechileFilter(newVal, item.types);
                }}
              />
            );
          })}
      </Form>
    </div>
  );
};
