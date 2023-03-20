import React, { useState } from 'react';
import {
  getDataFromSheetByState,
  getDataFromSheetByYears,
  loadGoogleSheet,
} from 'src/connector/google';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';
import { MexMap } from '../Maps/MexMap';
import Header from '../Header';
import MexOptionsPanel from '../OptionsPanel/MexOptionsPanel';

const useConstructor = (callBack: () => void) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const Inventory: React.FC = () => {
  // Component status variables
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  // Data variables
  const [dataByYear, setDataByYear] = useState(new Map<string, string[]>());
  const updateDataByYear = (years: string, states: string[]) => {
    setDataByYear(dataByYear.set(years, states));
  };

  const [stateOptions, setStateOptions] = useState(new Array<string>());
  const [yearOptions, setYearOptions] = useState(new Array<string>());

  // Data filter variables
  const [selectedYear, setSelectedYear] = useState('68-69');
  const [selectedState, setSelectedState] = useState('');
  const [filteredStates, setFilteredStates] = useState(new Array<string>());

  // Handlers
  const filteredStatesHandler = (year: string, data: Map<string, string[]>) => {
    setFilteredStates(Array.from(data.get(year) || []));
  };

  const filteredYearsHandler = (
    state: string,
    isRawData: boolean = false,
  ) => {};

  const selectStateHandler = (newStateValue: string) => {
    // Update selected values
    const newYearValue = '';
    setSelectedState(newStateValue);
    setSelectedYear(newYearValue);

    // Update filters
    filteredStatesHandler(newYearValue, dataByYear);

    // Print info
    console.log(`Selected State: ${newStateValue}`);
    console.log(`Selected Year: ${newYearValue}`);
  };

  const selectYearHandler = (newYearValue: string) => {
    // Update selected values
    const newStateValue = '';
    setSelectedYear(newYearValue);
    setSelectedState(newStateValue);

    // Update filters
    filteredStatesHandler(newYearValue, dataByYear);

    // Print info
    console.log(`Selected State: ${newStateValue}`);
    console.log(`Selected Year: ${newYearValue}`);
  };

  // Constructor
  useConstructor(async () => {
    try {
      console.log('Get Information from Google Spreadsheet');
      const sheet = await loadGoogleSheet();

      const rawDataByYear = getDataFromSheetByYears(sheet);
      const rawDataByState = getDataFromSheetByState(sheet);

      // Set all the options
      setStateOptions(Array.from(rawDataByState.keys()) || []);
      setYearOptions(Array.from(rawDataByYear.keys()) || []);

      // Update data variable
      rawDataByYear.forEach((states, years) => {
        updateDataByYear(years, states || []);
      });

      // Update filters
      filteredStatesHandler(selectedYear, rawDataByYear);

      // Print info
      console.log('rawDataByYear: ', rawDataByYear);
      console.log('rawDataByState: ', rawDataByState);
    } catch (error) {
      console.error(error);
      setError({
        statusCode: 500,
        message: `Unable to load Google credentials: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  });

  const subTitle = `México${selectedState && ` - ${selectedState}`}${
    selectedYear && ` (${selectedYear})`
  }`;
  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <div className="Inventory">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header title="Inventory" subTitle={subTitle} />
          <MexOptionsPanel
            selectedYear={selectedYear}
            selectedState={selectedState}
            yearOptions={yearOptions}
            stateOptions={stateOptions}
            selectYearHandler={selectYearHandler}
            selectStateHandler={selectStateHandler}
          />

          <MexMap
            selectStateHandler={selectStateHandler}
            selectedState={selectedState}
            filteredStates={filteredStates}
          />
          <p>{filteredStates.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default Inventory;
