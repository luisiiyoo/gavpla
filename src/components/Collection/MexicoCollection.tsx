import React, { useState } from 'react';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';
import { MexMap } from '../Maps/MexMap';
import Header from '../Header';
import MexOptionsPanel from '../OptionsPanel/MexOptionsPanel';
import YearsPanel from '../OptionsPanel/YearsPanel';
import MissingDetailsPanel from '../DetailsPanel/ MissingDetailsPanel';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import connector from 'src/connector';
import { extractInventoryData } from 'src/connector/backend';

const useConstructor = (callBack: () => void) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const MexicoCollection: React.FC = () => {
  const { languageCode } = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'MexicoCollection');

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
    if (newStateValue === selectedState) return;

    // Update selected values
    const newYearValue = '';
    setSelectedState(newStateValue);
    setSelectedYear(newYearValue);

    // Update filters
    filteredStatesHandler(newYearValue, dataByYear);
    filteredYearsHandler(newStateValue, dataByState);
  };

  const selectYearHandler = (newYearValue: string) => {
    if (newYearValue === selectedYear) return;

    // Update selected values
    const newStateValue = '';
    setSelectedYear(newYearValue);
    setSelectedState(newStateValue);

    // Update filters
    filteredStatesHandler(newYearValue, dataByYear);
    filteredYearsHandler(newStateValue, dataByState);
  };

  // Constructor
  useConstructor(async () => {
    try {
      const tokenID: string = await connector.getDefaultAccessTokenID();
      const mexicoCarPlatesInventory: Map<
        string,
        any
      > = await connector.getMexicoCarPlatesInventory(tokenID);

      const { dataByStateNames, dataByYearCodes } = extractInventoryData(
        mexicoCarPlatesInventory,
      );

      const statesKeys: string[] = Array.from(dataByStateNames.keys()) || [];
      const yearsKeys: string[] = Array.from(dataByYearCodes.keys()) || [];

      // Set all the options
      setStateOptions(statesKeys);
      setYearOptions(yearsKeys);

      // Update data variable
      dataByYearCodes.forEach((states: string[], year: string) => {
        updateDataByYear(year, states);
      });
      dataByStateNames.forEach((years: string[], state: string) => {
        updateDataByState(state, years);
      });

      // Update filters
      filteredStatesHandler(selectedYear, dataByYearCodes);
      filteredYearsHandler(selectedState, dataByStateNames);

      // Print info
      // console.log('dataByYearCodes: ', dataByYearCodes);
      // console.log('dataByStateNames: ', dataByStateNames);
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
    <div className="MexicoCollection" style={{ paddingBottom: '2%' }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header title={translation['title']} subTitle={subTitle} />
          <MexOptionsPanel
            selectedYear={selectedYear}
            selectedState={selectedState}
            yearOptions={yearOptions}
            stateOptions={stateOptions}
            selectYearHandler={selectYearHandler}
            selectStateHandler={selectStateHandler}
          />
          <YearsPanel
            selectedYear={selectedYear}
            yearOptions={yearOptions}
            selectYearHandler={selectYearHandler}
            filteredYears={filteredYears}
          />
          <MexMap
            selectStateHandler={selectStateHandler}
            selectedState={selectedState}
            filteredStates={filteredStates}
          />
          <MissingDetailsPanel
            selectedState={selectedState}
            selectedYear={selectedYear}
            filteredYears={filteredYears}
            yearOptions={yearOptions}
            filteredStates={filteredStates}
            stateOptions={stateOptions}
          />
        </>
      )}
    </div>
  );
};

export default MexicoCollection;
