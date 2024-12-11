import React, { useEffect, useState } from 'react';
import connector from 'src/connector';
import { BELicensePlatesData } from 'src/connector/backend.types';
import { TRANSLATIONS } from 'src/language';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { handleErrorMessage, toTitleCase, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { MxMap } from '../Maps/MxMap';
import { LicensePlateItemsPanel } from './LicensePlateItemsPanel/LicensePlateItemsPanel';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from 'reactstrap';
import {
  AmbulanceVehicle,
  BicycleVehicle,
  BusVehicle,
  CarVehicle,
  MotorcycleVehicle,
  TaxiVehicle,
  TrailerVehicle,
  TruckVehicle,
} from 'src/utils/vehicle_types';

export interface SingleRegionLicensePlatesPanelProps {
  regionCode: string;
}

const MOTORCYCLE = 'MOTORCYCLE';
const BICYCLE = 'BICYCLE';
const OTHER_VECHICLES = 'OTHER_VECHICLES';
const OTHER_VEHICLE_ICON_CLASSES = [
  BusVehicle.iconClassName,
  TaxiVehicle.iconClassName,
  CarVehicle.iconClassName,
  TruckVehicle.iconClassName,
  TrailerVehicle.iconClassName,
  AmbulanceVehicle.iconClassName,
];

export const SingleRegionLicensePlatesPanel: React.FC<SingleRegionLicensePlatesPanelProps> = ({
  regionCode,
}) => {
  const {
    stateCodes,
    userID,
    availableYears,
    languageCode,
  }: StateType = useSelector((state) => state.main);
  const vehicleTypesTransalations = TRANSLATIONS['VehicleTypes'][languageCode];

  const [selectedVehicleTypesCode, setSelectedVehicleTypesCode] = useState<
    string
  >(OTHER_VECHICLES);
  const [otherVechicleIconClass, setOtherVechicleIconClass] = useState<string>(
    BusVehicle.iconClassName,
  );

  const [bicyclePlatesDataArray, setBicyclePlatesDataArray] = useState<
    BELicensePlatesData[]
  >([]);
  const [motorcyclePlatesDataArray, setMotorcyclePlatesDataArray] = useState<
    BELicensePlatesData[]
  >([]);
  const [
    otherVehiclesPlatesDataArray,
    setOtherVehiclesPlatesDataArray,
  ] = useState<BELicensePlatesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  let regionCodesToFilter: Array<string>;
  let regionCodes: Array<string>;
  let title: string;
  if (regionCode === 'NATIONAL') {
    title = TRANSLATIONS.RegionNames[languageCode].NATIONAL;
    regionCodesToFilter = Object.keys(stateCodes);
    regionCodes = [regionCode];
  } else if (regionCode === 'METROPOLITAN') {
    title = TRANSLATIONS.RegionNames[languageCode].METROPOLITAN;
    regionCodesToFilter = ['DF', 'CDMX', 'MEX'];
    regionCodes = [regionCode];
  } else if (regionCode === 'DF' || regionCode === 'CDMX') {
    title = `${stateCodes['CDMX']} ( ${stateCodes['DF']} )`;
    regionCodesToFilter = ['DF', 'CDMX'];
    regionCodes = ['DF', 'CDMX'];
  } else {
    title = stateCodes[regionCode];
    regionCodesToFilter = [regionCode];
    regionCodes = [regionCode];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal =
        OTHER_VEHICLE_ICON_CLASSES[
          new Date().getSeconds() % OTHER_VEHICLE_ICON_CLASSES.length
        ];
      setOtherVechicleIconClass(newVal);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useConstructor(async () => {
    try {
      setIsLoading(true);

      // Other Vehicles Request
      const otherVehiclesData: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        {
          region_codes: regionCodes,
          from_year: availableYears.from_year,
          to_year: availableYears.to_year,
          exclude_vehicle_types: [
            ...MotorcycleVehicle.types,
            ...BicycleVehicle.types,
          ],
        },
      );
      setOtherVehiclesPlatesDataArray(otherVehiclesData);

      // Bicycles Request
      const bicycleData: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        {
          region_codes: regionCodes,
          from_year: availableYears.from_year,
          to_year: availableYears.to_year,
          vehicle_types: BicycleVehicle.types,
        },
      );
      setBicyclePlatesDataArray(bicycleData);

      // Motorcyles Request
      const motorcycleData: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        {
          region_codes: regionCodes,
          from_year: availableYears.from_year,
          to_year: availableYears.to_year,
          vehicle_types: MotorcycleVehicle.types,
        },
      );
      setMotorcyclePlatesDataArray(motorcycleData);
    } catch (error) {
      setError(handleErrorMessage(error, languageCode));
    } finally {
      setIsLoading(false);
    }
  });

  const toggleHandler = (value: string) => {
    if (value === selectedVehicleTypesCode) setSelectedVehicleTypesCode('');
    else setSelectedVehicleTypesCode(value);
  };

  const BicycleLicensePlateItemsPanel = (
    <LicensePlateItemsPanel
      platesDataArray={bicyclePlatesDataArray}
      hideStateName={true}
    />
  );

  const MotorcycleLicensePlateItemsPanel = (
    <LicensePlateItemsPanel
      platesDataArray={motorcyclePlatesDataArray}
      hideStateName={true}
    />
  );
  const OtherVehiclesLicensePlateItemsPanel = (
    <LicensePlateItemsPanel
      platesDataArray={otherVehiclesPlatesDataArray}
      hideStateName={true}
    />
  );
  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="SingleRegionLicensePlatesPanel">
          <Header title={toTitleCase(title)} />
          <MxMap
            selectStateHandler={(val) => {}}
            filteredStates={regionCodesToFilter}
            staticMap={true}
          />
          {motorcyclePlatesDataArray.length === 0 &&
          bicyclePlatesDataArray.length === 0 ? (
            OtherVehiclesLicensePlateItemsPanel
          ) : (
            <div
              className="VehiclesTypesAccordion"
              style={{ paddingTop: '15px' }}
            >
              <Accordion
                open={selectedVehicleTypesCode}
                {...{ toggle: toggleHandler }}
              >
                {
                  /* Bicycle Plates */
                  bicyclePlatesDataArray.length > 0 && (
                    <AccordionItem key={BICYCLE}>
                      <AccordionHeader targetId={BICYCLE}>
                        <i className={BicycleVehicle.iconClassName} /> &nbsp;
                        {`${vehicleTypesTransalations[BICYCLE]}`}
                      </AccordionHeader>
                      <AccordionBody accordionId={BICYCLE}>
                        {BicycleLicensePlateItemsPanel}
                      </AccordionBody>
                    </AccordionItem>
                  )
                }
                {
                  /* Motorcycle Plates */
                  motorcyclePlatesDataArray.length > 0 && (
                    <AccordionItem key={MOTORCYCLE}>
                      <AccordionHeader targetId={MOTORCYCLE}>
                        <i className={MotorcycleVehicle.iconClassName} /> &nbsp;
                        {`${vehicleTypesTransalations[MOTORCYCLE]}`}
                      </AccordionHeader>
                      <AccordionBody accordionId={MOTORCYCLE}>
                        {MotorcycleLicensePlateItemsPanel}
                      </AccordionBody>
                    </AccordionItem>
                  )
                }

                {
                  /* Other Vehicles Plates*/
                  otherVehiclesPlatesDataArray.length > 0 && (
                    <AccordionItem key={OTHER_VECHICLES}>
                      <AccordionHeader targetId={OTHER_VECHICLES}>
                        <i className={otherVechicleIconClass} /> &nbsp;
                        {`${vehicleTypesTransalations[OTHER_VECHICLES]}`}
                      </AccordionHeader>
                      <AccordionBody accordionId={OTHER_VECHICLES}>
                        {OtherVehiclesLicensePlateItemsPanel}
                      </AccordionBody>
                    </AccordionItem>
                  )
                }
              </Accordion>
            </div>
          )}
        </div>
      )}
    </>
  );
};
