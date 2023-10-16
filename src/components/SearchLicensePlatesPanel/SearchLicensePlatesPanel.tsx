import React, { useState } from 'react';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import './style.css';
import { getTranslation } from 'src/language';
import { useConstructor } from 'src/utils';
import { BELicensePlatesData } from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import OptionsPanel from './OptionsPanel/OptionsPanel';

export const SearchLicensePlatesPanel: React.FC = () => {
  const { languageCode }: StateType = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'Search');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const [selectedStates, setSelectedStates] = useState(new Array<string>());
  const [selectedAdditionalRegions, setSelectedAdditionalRegions] = useState(
    new Array<string>(),
  );
  const [fromYear, setFromYear] = useState(1968);
  const [toYear, setToYear] = useState(1969);

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
            selectRegionCodesHandler={(val) => {
              console.log(val);
            }}
          />
        </div>
      )}
    </>
  );
};

export default SearchLicensePlatesPanel;
