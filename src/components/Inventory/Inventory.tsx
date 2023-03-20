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

  const [stateOptions, setStateOptions] = useState(new Array<string>());
  const [yearOptions, setYearOptions] = useState(new Array<string>());

  // Data variables
  const [dataByYear, setDataByYear] = useState(new Map<string, string[]>());
  const [dataByState, setDataByState] = useState(new Map<string, string[]>());

  const updateDataByYear = (year: string, states: string[]) => {
    setDataByYear(dataByYear.set(year, states));
  };
  const updateDataByState = (state: string, years: string[]) => {
    setDataByState(dataByYear.set(state, years));
    // setDataByState(dataByState.set)
  };

  // Data filter variables
  const [selectedYear, setSelectedYear] = useState('68-69');
  const [selectedState, setSelectedState] = useState('');

  const [filteredStates, setFilteredStates] = useState(new Array<string>());
  const [filteredYears, setFilteredYears] = useState(new Array<string>());

  // Handlers
  const filteredStatesHandler = (year: string, data: Map<string, string[]>) => {
    setFilteredStates(Array.from(data.get(year) || []));
  };

  const filteredYearsHandler = (state: string, data: Map<string, string[]>) => {
    setFilteredYears(Array.from(data.get(state) || []));
  };

  const selectStateHandler = (newStateValue: string) => {
    // Update selected values
    const newYearValue = '';
    setSelectedState(newStateValue);
    setSelectedYear(newYearValue);

    // Update filters
    filteredStatesHandler(newYearValue, dataByYear);
    filteredYearsHandler(newStateValue, dataByState);

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
    filteredYearsHandler(newStateValue, dataByState);

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
      const rawDataByStateWithCondition = getDataFromSheetByState(sheet);

      const statesKeys: string[] =
        Array.from(rawDataByStateWithCondition.keys()) || [];
      const yearsKeys: string[] = Array.from(rawDataByYear.keys()) || [];

      const rawDataByState = new Map(
        statesKeys.map((state: string) => {
          const stateWithCondition: Map<string, number | undefined> =
            rawDataByStateWithCondition.get(state) || new Map();
          const years: string[] = Array.from(stateWithCondition.keys());
          return [state, years];
        }),
      );

      // Set all the options
      setStateOptions(statesKeys);
      setYearOptions(yearsKeys);

      // Update data variable
      rawDataByYear.forEach((states: string[], year: string) => {
        updateDataByYear(year, states);
      });
      rawDataByState.forEach((years: string[], state: string) => {
        updateDataByState(state, years);
      });

      // Update filters
      filteredStatesHandler(selectedYear, rawDataByYear);
      filteredYearsHandler(selectedState, rawDataByState);

      // Print info
      console.log('rawDataByYear: ', rawDataByYear);
      console.log('rawDataByState: ', rawDataByState);
      // console.log('rawDataByState: ', rawDataByStateWithCondition);
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
          <div>
            <h5>Filtered Years:</h5>
            <p>{filteredYears.join(', ')}</p>
          </div>
          <div>
            <h5>Filtered States:</h5>
            <p>{filteredStates.join(', ')}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Inventory;
