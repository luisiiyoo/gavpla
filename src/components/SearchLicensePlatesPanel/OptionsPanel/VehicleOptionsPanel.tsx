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

export interface VehicleOptionsPanelProps {
  excludedVehicleTypes: Set<string>;
  setExcludedVehicleTypes: (selectedTypes: Set<string>) => void;
}

export const VehicleOptionsPanel = ({
  excludedVehicleTypes,
  setExcludedVehicleTypes,
}: VehicleOptionsPanelProps) => {
  const {
    // vehicleTypes,
    languageCode,
  }: StateType = useSelector((state) => state.main);
  const transalation = TRANSLATIONS.Search[languageCode];
  // console.log(Object.keys(vehicleTypes))

  //   const [searchUnknown, setSearchUnknown] = useState<boolean>(true);
  const [searchMotorcycles, setSearchMotorcycles] = useState<boolean>(true);
  const [searchBicycles, setSearchBicycles] = useState<boolean>(true);
  const [searchAmbulance, setSearchAmbulance] = useState<boolean>(true);

  const [searchPolice, setSearchPolice] = useState<boolean>(true);
  const [searchTaxi, setSearchTaxi] = useState<boolean>(true);
  const [searchBus, setSearchBus] = useState<boolean>(true);
  const [searchTruck, setSearchTruck] = useState<boolean>(true);
  const [searchTrailer, setSearchTrailer] = useState<boolean>(true);
  const [searchEcoFriendly, setSearchEcoFriendly] = useState<boolean>(true);
  const [searchHandicapped, setSearchHandicapped] = useState<boolean>(true);
  const [searchCars, setSearchCars] = useState<boolean>(true);

  const [searchFrontierVehicles, setSearchFrontierVehicles] = useState<boolean>(
    true,
  );
  const [searchFederalVehicles, setSearchFederalVehicles] = useState<boolean>(
    true,
  );

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
      {/* {Array.from(excludedVehicleTypes).map((t, i) => <p key={i}>{t}</p>)} */}
      <h4>{transalation.OptionsPanel.titleVehicleSelection}</h4>
      <Form className="OptionsPanel-FormVehicleTypes">
        <VehicleOption
          iconClassName="fa-solid fa-car"
          stateValue={searchCars}
          stateHandler={() => {
            setSearchCars(!searchCars);
            handleVechileFilter(!searchCars, [
              'ANTIQUE-CAR',
              'COMMERCIAL-CAR',
              'DEALER',
              'PRIVATE-CAR',
              'PROVISIONAL',
              'SPF-CAR',
              'SPF-RENTAL',
            ]);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-bicycle"
          stateValue={searchBicycles}
          stateHandler={() => {
            setSearchBicycles(!searchBicycles);
            handleVechileFilter(!searchBicycles, ['BICYCLE', 'TRICYCLE']);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-motorcycle"
          stateValue={searchMotorcycles}
          stateHandler={() => {
            setSearchMotorcycles(!searchMotorcycles);
            handleVechileFilter(!searchMotorcycles, ['MOTORCYCLE']);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-seedling"
          stateValue={searchEcoFriendly}
          stateHandler={() => {
            setSearchEcoFriendly(!searchEcoFriendly);
            handleVechileFilter(!searchEcoFriendly, ['ECO-FRIENDLY']);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-wheelchair-move"
          stateValue={searchHandicapped}
          stateHandler={() => {
            setSearchHandicapped(!searchHandicapped);
            handleVechileFilter(!searchHandicapped, ['HANDICAPPED']);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-bus"
          stateValue={searchBus}
          stateHandler={() => {
            setSearchBus(!searchBus);
            handleVechileFilter(!searchBus, [
              'BUS',
              'COMMERCIAL-BUS',
              'MICROBUS',
              'PRIVATE-BUS',
              'SCT-BUS',
              'SPF-BUS',
            ]);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-taxi"
          stateValue={searchTaxi}
          stateHandler={() => {
            setSearchTaxi(!searchTaxi);
            handleVechileFilter(!searchTaxi, ['TAXI']);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-truck"
          stateValue={searchTruck}
          stateHandler={() => {
            setSearchTruck(!searchTruck);
            handleVechileFilter(!searchTruck, [
              'COMMERCIAL-TRUCK',
              'PRIVATE-TRUCK',
              'SAF-TRUCK',
              'SCT-TRUCK',
              'SPF-TRUCK',
              'TRUCK',
            ]);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-trailer"
          stateValue={searchTrailer}
          stateHandler={() => {
            setSearchTrailer(!searchTrailer);
            handleVechileFilter(!searchTrailer, [
              'COMMERCIAL-TRAILER',
              'PRIVATE-TRAILER',
              'SAF-TRAILER',
              'SCT-TRAILER',
              'SPF-TRAILER',
              'TRAILER',
            ]);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-person-military-rifle"
          stateValue={searchPolice}
          stateHandler={() => {
            setSearchPolice(!searchPolice);
            handleVechileFilter(!searchPolice, [
              'FEDERAL-POLICE',
              'MEXICAN-NAVY',
              'MINISTERIAL-POLICE',
              'POLICE',
            ]);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-truck-medical"
          stateValue={searchAmbulance}
          stateHandler={() => {
            setSearchAmbulance(!searchAmbulance);
            handleVechileFilter(!searchAmbulance, [
              'AMBULANCE',
              'CIVIL-PROTECTION',
              'FIREFIGHTER',
            ]);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-arrow-down-up-across-line"
          stateValue={searchFrontierVehicles}
          stateHandler={() => {
            setSearchFrontierVehicles(!searchFrontierVehicles);
            handleVechileFilter(!searchFrontierVehicles, ['FRONTIER']);
          }}
        />
        <VehicleOption
          iconClassName="fa-solid fa-flag"
          stateValue={searchFederalVehicles}
          stateHandler={() => {
            setSearchFederalVehicles(!searchFederalVehicles);
            handleVechileFilter(!searchFederalVehicles, [
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
            ]);
          }}
        />
        {/* <VehicleOption
          iconClassName="fa-solid fa-question"
          stateValue={searchUnknown}
          stateHandler={() => {
            setSearchUnknown(!searchUnknown);
            handleVechileFilter(!searchUnknown, ['UNKNOWN']);
          }}
        /> */}
      </Form>
    </div>
  );
};
