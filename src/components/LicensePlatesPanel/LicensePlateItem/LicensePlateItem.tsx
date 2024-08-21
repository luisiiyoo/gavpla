import React from 'react';
import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEVehicleTypes,
} from 'src/connector/backend.types';
import NotFoundImage from 'src/images/image-not-found.png';
import './LicensePlateItem.css';
import { useSelector } from 'react-redux';
import { TRANSLATIONS } from 'src/language/language';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { VehicleIconsMap } from 'src/utils/vehicle_types';
import { transalateVehicleType } from 'src/utils';

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

  const rawVehicleType = data.vehicle_type.replace(' ', '-');
  const vehicleTypeTranslated = transalateVehicleType(
    languageCode,
    data.vehicle_type,
    vechicleTypes,
  );
  let years =
    data.from_year === data.to_year
      ? data.from_year
      : `${data.from_year}-${data.to_year}`;

  const vehicleIcon = VehicleIconsMap.get(rawVehicleType);
  const orgInitialsValue = data.org_initials && ` (${data.org_initials})`;
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
          <div className="LicensePlateItem-VehicleType">
            {vehicleIcon} {vehicleTypeTranslated} {orgInitialsValue}
          </div>
        )}
      </div>
      <div className="LicensePlateItem-Image">
        <img
          className={`${rawVehicleType}-IMG`}
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
