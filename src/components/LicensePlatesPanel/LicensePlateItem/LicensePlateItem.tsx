import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [detailOpen, setDetailOpen] = useState(false);
  const titleId = useMemo(
    () =>
      `LicensePlateItem-modal-title-${data.plate_id_code.replace(
        /[^a-zA-Z0-9_-]/g,
        '_',
      )}`,
    [data.plate_id_code],
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
  const years =
    data.from_year === data.to_year
      ? String(data.from_year)
      : `${data.from_year}–${data.to_year}`;

  const vehicleIcon = VehicleIconsMap.get(rawVehicleType);
  const orgInitialsValue = data.org_initials && ` (${data.org_initials})`;

  const modalRegionCode = data.region_code?.trim() || '';
  const modalStateCodes = data.state_codes?.trim() || '';
  const modalOrgInitials = data.org_initials?.trim() || '';

  const imageUrl =
    connector.getUserLicensePlatesImageURL(userID, data.user_plate_id) ||
    NotFoundImage;

  const modalLabels = TRANSLATIONS.LicensePlateItemModal[languageCode];

  const openDetail = useCallback(() => setDetailOpen(true), []);
  const closeDetail = useCallback(() => setDetailOpen(false), []);

  useEffect(() => {
    if (!detailOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [detailOpen, closeDetail]);

  const modalBody = detailOpen
    ? createPortal(
        <div className="LicensePlateItem-OverlayRoot">
          <div
            className="LicensePlateItem-Backdrop"
            role="presentation"
            aria-hidden
            onClick={closeDetail}
          />
          <div className="LicensePlateItem-ModalShell">
            <div
              className="LicensePlateItem-Modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                type="button"
                className="LicensePlateItem-ModalClose"
                onClick={closeDetail}
                aria-label={modalLabels.close}
              >
                ×
              </button>
              <div className="LicensePlateItem-ModalBody">
                <div className="LicensePlateItem-ModalImage">
                  <img
                    className={`LicensePlateItem-ModalImg ${rawVehicleType}-IMG`}
                    src={imageUrl}
                    alt={data.plate_id_code}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = NotFoundImage;
                    }}
                  />
                </div>
                <div className="LicensePlateItem-ModalDetails">
                  <h2 id={titleId} className="LicensePlateItem-ModalTitle">
                    {data.plate_id_code}
                  </h2>
                  <dl className="LicensePlateItem-ModalDl">
                    <div className="LicensePlateItem-ModalRow">
                      <dt>{modalLabels.state}</dt>
                      <dd>{regionName}</dd>
                    </div>
                    <div className="LicensePlateItem-ModalRow">
                      <dt>{modalLabels.years}</dt>
                      <dd>{years}</dd>
                    </div>
                    <div className="LicensePlateItem-ModalRow">
                      <dt>{modalLabels.vehicleType}</dt>
                      <dd>
                        <span className="LicensePlateItem-ModalVehicle">
                          {vehicleIcon} {vehicleTypeTranslated}
                        </span>
                      </dd>
                    </div>
                    {modalRegionCode ? (
                      <div className="LicensePlateItem-ModalRow">
                        <dt>{modalLabels.regionCode}</dt>
                        <dd>{modalRegionCode}</dd>
                      </div>
                    ) : null}
                    {modalStateCodes ? (
                      <div className="LicensePlateItem-ModalRow">
                        <dt>{modalLabels.stateCodes}</dt>
                        <dd>{modalStateCodes}</dd>
                      </div>
                    ) : null}
                    {modalOrgInitials ? (
                      <div className="LicensePlateItem-ModalRow">
                        <dt>{modalLabels.orgInitials}</dt>
                        <dd>{modalOrgInitials}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        className="LicensePlateItem"
        onClick={openDetail}
        aria-haspopup="dialog"
        aria-expanded={detailOpen}
      >
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
            src={imageUrl}
            alt={data.plate_id_code}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = NotFoundImage;
            }}
          />
        </div>
      </button>
      {modalBody}
    </>
  );
};
