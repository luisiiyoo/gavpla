import React from 'react';
import { BELicensePlatesData } from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { LicensePlateItem } from '../LicensePlateItem/LicensePlateItem';
import { useSelector } from 'react-redux';
import './LicensePlateItemsPanel.css';

export type LicensePlateItemsPanelProps = {
  platesDataArray: BELicensePlatesData[];
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
};

export const LicensePlateItemsPanel: React.FC<LicensePlateItemsPanelProps> = ({
  platesDataArray,
  hideStateName,
  hideYears,
  hideVehicleType,
}) => {
  const { vehicleTypes, userID }: StateType = useSelector(
    (state) => state.main,
  );
  return (
    <div className="LicensePlateItemsPanel">
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
  );
};
