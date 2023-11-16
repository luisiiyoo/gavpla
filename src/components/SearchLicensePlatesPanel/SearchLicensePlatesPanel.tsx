import React, { useState } from 'react';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import './style.css';
import { getTranslation } from 'src/language';
import { createNotification, handleErrorMessage } from 'src/utils';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
  SerchRequestArgs,
} from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import OptionsPanel from './OptionsPanel/OptionsPanel';
import { Button } from 'reactstrap';
import { store } from 'react-notifications-component';
import { LicensePlatesPanel } from '../LicensePlatesPanel/LicensePlatesPanel';
import connector from 'src/connector';

export const SearchLicensePlatesPanel: React.FC = () => {
  const {
    languageCode,
    availableYears,
    userID,
    stateCodes,
  }: StateType = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'Search');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const [platesDataArray, setPlatesDataArray] = useState<BELicensePlatesData[]>(
    [],
  );
  const [requestArgs, setRequestArgs] = useState<SerchRequestArgs>({
    region_codes: [],
    from_year: availableYears.from_year,
    to_year: availableYears.to_year,
  });
  const [selectedCodes, setSelectedCodes] = useState<string[]>(
    requestArgs.region_codes,
  );
  const [fromYear, setFromYear] = useState<number>(1968);
  const [toYear, setToYear] = useState<number>(1969);

  const areThereDifferences: boolean = [
    JSON.stringify(selectedCodes) !== JSON.stringify(requestArgs.region_codes),
    fromYear !== requestArgs.from_year,
    toYear !== requestArgs.to_year,
  ].some((item) => item);

  const requestDataToBE = async (): Promise<number> => {
    try {
      setIsLoading(true);
      const codes =
        selectedCodes.length === 0 ? Object.keys(stateCodes) : selectedCodes;
      const params: BEQueryLicensePlatesData = {
        region_codes: codes,
        from_year: fromYear,
        to_year: toYear,
      };
      const platesData: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );
      setPlatesDataArray(platesData);
      setRequestArgs({
        region_codes: selectedCodes,
        from_year: fromYear,
        to_year: toYear,
      });
      return platesData.length;
    } catch (error) {
      console.error(error);
      setError(handleErrorMessage(error, languageCode));
      return 0;
    } finally {
      setIsLoading(false);

      const element = document.querySelector('.MxMap');
      element?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const isAValidYearRange = () => {
    return (
      fromYear <= toYear &&
      fromYear >= availableYears.from_year &&
      toYear <= availableYears.to_year
    );
  };

  const handleSearch = async () => {
    if (!areThereDifferences) {
      store.addNotification(
        createNotification(
          'warning',
          translation['SameSearchParametersWarning'],
        ),
      );
    } else {
      if (!isAValidYearRange()) {
        store.addNotification(
          createNotification('warning', translation['InvalidYearRangeWarning']),
        );
        setPlatesDataArray([]);
        setRequestArgs({
          region_codes: selectedCodes,
          from_year: fromYear,
          to_year: toYear,
        });
      } else {
        // requesting data
        const numResults = await requestDataToBE();
        store.addNotification(
          createNotification(
            'success',
            `${numResults} ${translation['SucceedSearchInfo']}`,
          ),
        );
      }
    }
  };

  const title = translation['title'];
  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? <Loader /> : undefined}
      <div
        className="SearchLicensePlatesPanel"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
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
        <div
          className="SearchLicensePlatesPanel-Submit"
          style={{
            display:
              areThereDifferences && isAValidYearRange() ? 'block' : 'none',
          }}
        >
          <Button className={`SearchButton`} onClick={handleSearch}>
            {translation['SearchButtonLabel']}
          </Button>
        </div>
        <div className="SearchResults">
          {
            <LicensePlatesPanel
              platesDataArray={platesDataArray}
              hideStateName={requestArgs.region_codes.length === 1}
              staticMap={false}
              regionCodesToFilter={
                selectedCodes.length > 0
                  ? selectedCodes
                  : Object.keys(stateCodes)
              }
              selectStateHandler={(code: string) => {
                if (code === '') {
                  setSelectedCodes([]);
                } else {
                  const index = selectedCodes.indexOf(code);
                  const newSelectedCodes = [...selectedCodes];
                  if (index > -1) {
                    console.log(code);
                    newSelectedCodes.splice(index, 1);
                    if (code === 'CDMX') {
                      const indexDF = newSelectedCodes.indexOf('DF');
                      if (indexDF > -1) newSelectedCodes.splice(indexDF, 1);
                    }
                  } else {
                    newSelectedCodes.push(code);
                    if (code === 'CDMX') {
                      newSelectedCodes.push('DF');
                    }
                  }
                  const uniqueCodes = new Set(newSelectedCodes);
                  const newSelectedCodesSorted = Array.from(uniqueCodes);
                  newSelectedCodesSorted.sort();
                  setSelectedCodes(newSelectedCodesSorted);
                }
              }}
            />
          }
        </div>
      </div>
    </>
  );
};

export default SearchLicensePlatesPanel;
