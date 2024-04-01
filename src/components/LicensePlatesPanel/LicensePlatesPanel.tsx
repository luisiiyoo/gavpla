import React from 'react';
import { BELicensePlatesData } from 'src/connector/backend.types';

import { LicensePlateItem } from './LicensePlateItem/LicensePlateItem';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { MxMap } from '../Maps/MxMap';
import './style.css';

export interface LicensePlatesPanelProps {
  platesDataArray: BELicensePlatesData[];
  regionCodesToFilter?: string[];
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
  displayMap?: boolean;
  staticMap: boolean;
  selectStateHandler: (state: string) => void;
}

export const LicensePlatesPanel: React.FC<LicensePlatesPanelProps> = ({
  platesDataArray,
  regionCodesToFilter,
  staticMap,
  selectStateHandler,
  displayMap = true,
  hideStateName = false,
  hideYears = false,
  hideVehicleType = false,
}) => {
  const { vehicleTypes, userID }: StateType = useSelector(
    (state) => state.main,
  );

  const filteredStates =
    regionCodesToFilter ||
    Array.from(new Set(platesDataArray.map((d) => d.region_code)));
  return (
    <div className="LicensePlatesPanel">
      {!displayMap ? undefined : (
        <MxMap
          selectStateHandler={selectStateHandler}
          filteredStates={filteredStates}
          staticMap={staticMap}
        />
      )}

      <div className="LicensePlatesPanel-LicensePlateItems">
        {platesDataArray
          .sort((a, b) => a.from_year - b.from_year)
          .map((plateData) => (
            <LicensePlateItem
              data={plateData}
              userID={userID}
              vechicleTypes={vehicleTypes}
              key={plateData.plate_id_code}
              hideStateName={hideStateName}
              hideYears={hideYears}
              hideVehicleType={hideVehicleType}
            />
          ))}
      </div>
    </div>
  );
};
