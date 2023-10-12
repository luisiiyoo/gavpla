import React from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEVehicleTypes,
} from 'src/connector/backend.types';
import NotFoundImage from 'src/images/image-not-found.png';
import './style.css';
// import { MexMap } from '../Maps/MexMap';
import { useSelector } from 'react-redux';
import { ES_LANGUAGE } from 'src/language/language';

export interface LicensePlateItemProps {
  userID: string;
  data: BELicensePlatesData;
  vechicleTypes: BEVehicleTypes;
  hideStateName?: boolean;
  hideYears?: boolean;
  hideVehicleType?: boolean;
}

export const LicensePlateItem: React.FC<LicensePlateItemProps> = ({
  userID,
  data,
  vechicleTypes,
  hideStateName,
  hideYears,
  hideVehicleType,
}) => {
  const { languageCode } = useSelector((state) => state.main);

  let vehicle_type = data.vehicle_type;
  let years =
    data.from_year == data.to_year
      ? data.from_year
      : `${data.from_year}-${data.to_year}`;

  if (languageCode == ES_LANGUAGE) {
    vehicle_type = vechicleTypes[vehicle_type].toUpperCase();
  } else {
    vehicle_type = vehicle_type.replace('-', ' ');
  }
  return (
    <div className="LicensePlateItem">
      {hideStateName ? undefined : (
        <div className="LicensePlateItem-Name">{data.region_code}</div>
      )}
      {hideYears ? undefined : (
        <div className="LicensePlateItem-Years">{years}</div>
      )}
      {hideVehicleType ? undefined : (
        <div className="LicensePlateItem-VehicleType">{vehicle_type}</div>
      )}
      <div className="LicensePlateItem-Image">
        <img
          src={
            connector.getUserLicensePlatesImageURL(
              userID,
              data.user_plate_id,
            ) || NotFoundImage
          }
          // alt={`${inventoryItem.stateCode}-${inventoryItem.yearCode}`}
          // width="100%"
          onError={(e) => {
            e.currentTarget.onerror = null; // prevents looping
            e.currentTarget.src = NotFoundImage;
          }}
        />
      </div>
    </div>
  );
};
