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
import { ES_LANGUAGE, TRANSLATIONS } from 'src/language/language';
import { StateType } from 'src/redux/reducers/Main/Main.types';

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
  const { languageCode, stateCodes }: StateType = useSelector(
    (state) => state.main,
  );
  const transalation = TRANSLATIONS.RegionNames[languageCode];
  const regionName = transalation.hasOwnProperty(data.region_code)
    ? transalation[data.region_code]
    : stateCodes[data.region_code];

  let vehicle_type = data.vehicle_type;
  let years =
    data.from_year === data.to_year
      ? data.from_year
      : `${data.from_year}-${data.to_year}`;

  if (languageCode === ES_LANGUAGE) {
    vehicle_type = vechicleTypes[vehicle_type].toUpperCase();
  } else {
    vehicle_type = vehicle_type.replace('-', ' ');
  }
  return (
    <div className="LicensePlateItem">
      <div className="LicensePlateItem-Header">
        {hideStateName ? undefined : (
          <div className="LicensePlateItem-Name">{regionName}</div>
        )}
        {hideYears ? undefined : (
          <div className="LicensePlateItem-Years">{years}</div>
        )}
        {hideVehicleType ? undefined : (
          <div className="LicensePlateItem-VehicleType">{vehicle_type}</div>
        )}
      </div>
      <div className="LicensePlateItem-Image">
        <img
          src={
            connector.getUserLicensePlatesImageURL(
              userID,
              data.user_plate_id,
            ) || NotFoundImage
          }
          // alt={`${inventoryItem.stateCode}-${inventoryItem.yearCode}`}
          alt={data.plate_id_code}
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
