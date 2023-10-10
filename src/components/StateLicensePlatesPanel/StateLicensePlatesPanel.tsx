import React, { useState } from 'react';
import connector from 'src/connector';
import {
  BELicensePlateRegionCodes,
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';
import NotFoundImage from 'src/images/image-not-found.png';
import './style.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { setIsLoading } from 'src/redux/actions/MainComponent/MainComponent';

export interface StateLicensePlatesPanelProps {
  languageCode: string;
  userID: string;
  regionCode: string;
  fromYear?: number;
  toYear?: number;
  // selectStateHandler: (state: string) => void;
  // selectedState: string;
  // filteredStates: string[];
}

export const StateLicensePlatesPanel: React.FC<StateLicensePlatesPanelProps> = ({
  languageCode,
  userID,
  regionCode,
  fromYear = 1968,
  toYear = 1999,
}) => {
  // const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state.main);
  // dispatch(setIsLoading(true));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const [platesArray, setPlatesArray] = useState(
    new Array<BELicensePlatesData>(),
  );

  useConstructor(async () => {
    try {
      const params: BEQueryLicensePlatesData = {
        region_code: regionCode,
        from_year: fromYear,
        to_year: toYear,
      };

      const platesData: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );
      setPlatesArray(platesData);
    } catch (error) {
      console.error(error);
      setError({
        statusCode: 500,
        message: `Unable get inventory data: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  });

  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="StateLicensePlatesPanel"
          style={{ height: 'auto', padding: '30px' }}
        >
          {platesArray.map((plateData, id) => (
            <div className="StateLicensePlatesItem" key={id}>
              <div>
                <span>{plateData.vehicle_type}</span>
              </div>
              <div>
                <span>
                  {plateData.from_year}-{plateData.to_year}
                </span>
              </div>
              <div>
                <img
                  src={
                    connector.getUserLicensePlatesImageURL(
                      userID,
                      plateData.user_plate_id,
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
          ))}
        </div>
      )}
    </>
  );
};
