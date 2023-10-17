import React, { useState } from 'react';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import './style.css';
import { getTranslation } from 'src/language';
import { createNotification, useConstructor } from 'src/utils';
import {
  BELicensePlatesData,
  SerchRequestArgs,
} from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import OptionsPanel from './OptionsPanel/OptionsPanel';
import { Button } from 'reactstrap';
import { store } from 'react-notifications-component';
import { LicensePlatesPanel } from '../LicensePlatesPanel/LicensePlatesPanel';

export const SearchLicensePlatesPanel: React.FC = () => {
  const { languageCode, availableYears }: StateType = useSelector(
    (state) => state.main,
  );
  const translation = getTranslation(languageCode, 'Search');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const [requestArgs, setRequestArgs] = useState<SerchRequestArgs>({
    region_codes: ['MICH'],
    from_year: availableYears.from_year,
    to_year: availableYears.to_year,
  });
  const [selectedCodes, setSelectedCodes] = useState<string[]>(
    requestArgs.region_codes,
  );
  const [fromYear, setFromYear] = useState<number>(1992);
  const [toYear, setToYear] = useState<number>(1997);

  useConstructor(async () => {
    // let allPlatesData: BELicensePlatesData[] = [];
    try {
      //   for (const regionCode of regionCodes) {
      //     const params: BEQueryLicensePlatesData = {
      //       region_code: regionCode,
      //       from_year: fromYear,
      //       to_year: toYear,
      //     };
      //     const platesData: BELicensePlatesData[] = await connector.getLicensePlatesData(
      //       userID,
      //       params,
      //     );
      //     allPlatesData.push(...platesData);
      //   }
      //   setPlatesArray(allPlatesData);
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

  const areThereDifferences: boolean = [
    JSON.stringify(selectedCodes) !== JSON.stringify(requestArgs.region_codes),
    fromYear !== requestArgs.from_year,
    toYear !== requestArgs.to_year,
  ].some((item) => item);

  const handleSearch = () => {
    if (!areThereDifferences) {
      store.addNotification(
        createNotification('warning', translation["SameSearchParametersWarning"]),
      );
    }

    setRequestArgs({
      region_codes: selectedCodes,
      from_year: fromYear,
      to_year: toYear,
    });

    console.log(requestArgs);
  };

  const title = translation['title'];
  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="SearchLicensePlatesPanel">
          <Header title={title} />
          <OptionsPanel
            fromYear={fromYear}
            toYear={toYear}
            setFromYear={setFromYear}
            setToYear={setToYear}
            selectedCodes={selectedCodes}
            selectRegionCodesHandler={setSelectedCodes}
            requestArgs={requestArgs}
          />
          <div className="SearchLicensePlatesPanel-Submit">
            <Button
              className={`SearchButton `.concat(
                areThereDifferences ? 'ActiveButton' : '',
              )}
              onClick={handleSearch}
            >
              {translation["SearchButtonLabel"]}
            </Button>
          </div>
          <div className="SearchResults">
            {
              <LicensePlatesPanel
                displayHeaderTitle={false}
                regionCodes={selectedCodes}
                isAStateLicensePlate={false}
                hideStateName={selectedCodes.length === 1}
                staticMap={true}
                selectStateHandler={(val) => {}}
              />
            }
          </div>
        </div>
      )}
    </>
  );
};

export default SearchLicensePlatesPanel;
