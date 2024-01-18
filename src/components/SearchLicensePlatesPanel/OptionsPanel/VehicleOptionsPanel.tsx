import React, { useState } from 'react';
import { TRANSLATIONS } from 'src/language/language';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { Form, FormGroup, Input, Label } from 'reactstrap';

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
  const transalation = TRANSLATIONS.Search[languageCode];

  const [searchCars, setSearchCars] = useState<boolean>(true);
  const CAR_TYPES: string[] = [
    'ANTIQUE-CAR',
    'COMMERCIAL-CAR',
    'DEALER',
    'PRIVATE-CAR',
    'PROVISIONAL',
    'SPF-CAR',
    'SPF-RENTAL',
  ];

  const [searchBicycles, setSearchBicycles] = useState<boolean>(true);
  const BICYCLE_TYPES: string[] = ['BICYCLE', 'TRICYCLE'];

  const [searchMotorcycles, setSearchMotorcycles] = useState<boolean>(true);
  const MOTORCYCLE_TYPES: string[] = ['MOTORCYCLE'];

  const [searchEcoFriendly, setSearchEcoFriendly] = useState<boolean>(true);
  const ECO_TYPES: string[] = ['ECO-FRIENDLY'];

  const [searchHandicapped, setSearchHandicapped] = useState<boolean>(true);
  const HANDICAPPED_TYPES: string[] = ['HANDICAPPED'];

  const [searchBus, setSearchBus] = useState<boolean>(true);
  const BUS_TYPES: string[] = [
    'BUS',
    'COMMERCIAL-BUS',
    'MICROBUS',
    'PRIVATE-BUS',
    'SCT-BUS',
    'SPF-BUS',
  ];

  const [searchTaxi, setSearchTaxi] = useState<boolean>(true);
  const TAXI_TYPES: string[] = ['TAXI'];

  const [searchTruck, setSearchTruck] = useState<boolean>(true);
  const TRUCK_TYPES: string[] = [
    'COMMERCIAL-TRUCK',
    'PRIVATE-TRUCK',
    'SAF-TRUCK',
    'SCT-TRUCK',
    'SPF-TRUCK',
    'TRUCK',
  ];

  const [searchTrailer, setSearchTrailer] = useState<boolean>(true);
  const TRAILER_TYPES: string[] = [
    'COMMERCIAL-TRAILER',
    'PRIVATE-TRAILER',
    'SAF-TRAILER',
    'SCT-TRAILER',
    'SPF-TRAILER',
    'TRAILER',
  ];

  const [searchPolice, setSearchPolice] = useState<boolean>(true);
  const POLICE_TYPES: string[] = [
    'FEDERAL-POLICE',
    'MEXICAN-NAVY',
    'MINISTERIAL-POLICE',
    'POLICE',
  ];

  const [searchAmbulance, setSearchAmbulance] = useState<boolean>(true);
  const AMBULANCE_TYPES: string[] = [
    'AMBULANCE',
    'CIVIL-PROTECTION',
    'FIREFIGHTER',
  ];

  const [searchFrontierVehicles, setSearchFrontierVehicles] = useState<boolean>(
    true,
  );
  const FRONTIER_TYPES: string[] = ['FRONTIER'];

  const [searchFederalVehicles, setSearchFederalVehicles] = useState<boolean>(
    true,
  );
  const FEDERAL_TYPES: string[] = [
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
  ];

  const [searchUnknown, setSearchUnknown] = useState<boolean>(true);
  const UNKNOWN_TYPES: string[] = ['UNKNOWN'];

  // Control vars
  const [selectAllVechicleTypes, setSelectAllVechicleTypes] = useState(true);
  const vehicleOptions: VehicleTypeOptions = {
    'CAR-TYPES': {
      iconClassName: 'fa-solid fa-car',
      stateValue: searchCars,
      setStateValue: setSearchCars,
      types: CAR_TYPES,
    },
    'BICYCLE-TYPES': {
      iconClassName: 'fa-solid fa-bicycle',
      stateValue: searchBicycles,
      setStateValue: setSearchBicycles,
      types: BICYCLE_TYPES,
    },
    'MOTORCYCLE-TYPES': {
      iconClassName: 'fa-solid fa-motorcycle',
      stateValue: searchMotorcycles,
      setStateValue: setSearchMotorcycles,
      types: MOTORCYCLE_TYPES,
    },
    'ECO-TYPES': {
      iconClassName: 'fa-solid fa-seedling',
      stateValue: searchEcoFriendly,
      setStateValue: setSearchEcoFriendly,
      types: ECO_TYPES,
    },
    'HANDICAPPED-TYPES': {
      iconClassName: 'fa-solid fa-wheelchair-move',
      stateValue: searchHandicapped,
      setStateValue: setSearchHandicapped,
      types: HANDICAPPED_TYPES,
    },
    'BUS-TYPES': {
      iconClassName: 'fa-solid fa-bus',
      stateValue: searchBus,
      setStateValue: setSearchBus,
      types: BUS_TYPES,
    },
    'TAXI-TYPES': {
      iconClassName: 'fa-solid fa-taxi',
      stateValue: searchTaxi,
      setStateValue: setSearchTaxi,
      types: TAXI_TYPES,
    },
    'TRUCK-TYPES': {
      iconClassName: 'fa-solid fa-truck',
      stateValue: searchTruck,
      setStateValue: setSearchTruck,
      types: TRUCK_TYPES,
    },
    'TRAILER-TYPES': {
      iconClassName: 'fa-solid fa-trailer',
      stateValue: searchTrailer,
      setStateValue: setSearchTrailer,
      types: TRAILER_TYPES,
    },
    'POLICE-TYPES': {
      iconClassName: 'fa-solid fa-person-military-rifle',
      stateValue: searchPolice,
      setStateValue: setSearchPolice,
      types: POLICE_TYPES,
    },
    'AMBULANCE-TYPES': {
      iconClassName: 'fa-solid fa-truck-medical',
      stateValue: searchAmbulance,
      setStateValue: setSearchAmbulance,
      types: AMBULANCE_TYPES,
    },
    'FRONTIER-TYPES': {
      iconClassName: 'fa-solid fa-arrow-down-up-across-line',
      stateValue: searchFrontierVehicles,
      setStateValue: setSearchFrontierVehicles,
      types: FRONTIER_TYPES,
    },
    'FEDERAL-TYPES': {
      iconClassName: 'fa-solid fa-flag',
      stateValue: searchFederalVehicles,
      setStateValue: setSearchFederalVehicles,
      types: FEDERAL_TYPES,
    },
    'UNKNOWN-TYPES': {
      iconClassName: 'fa-solid fa-question',
      stateValue: searchUnknown,
      setStateValue: setSearchUnknown,
      types: UNKNOWN_TYPES,
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
      <h4>{transalation.OptionsPanel.titleVehicleSelection}</h4>
      <Form className="OptionsPanel-FormSelectAllVehicleTypes">
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
              ? transalation.OptionsPanel.deselectAllVehicleTypes
              : transalation.OptionsPanel.selectAllVehicleTypes}
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
