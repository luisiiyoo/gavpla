import React, { useState } from 'react';
import {
  // getDataFromSheetByState,
  getDataFromSheetByYears,
  loadGoogleSheet,
} from 'src/connector/google';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';
import { MexMap } from '../Maps/MexMap';
import Header from '../Header';
import { MexOptionsPanel } from '../OptionsPanel/MexOptionsPanel';

const useConstructor = (callBack: () => void) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const Inventory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const [dateStateData, setDateStateData] = useState(
    new Map<string, string[]>(),
  );
  const updateDateStateData = (years: string, states: string[]) => {
    setDateStateData(dateStateData.set(years, states));
  };

  const [selectedYears, setSelectedYears] = useState('68-69'); //72-73
  const [selectedState, setSelectedState] = useState('');
  const [filterStates, setFilterStates] = useState(new Array<string>());

  const handleSelectState = (state: string) => {
    setSelectedState(state);
    setFilterStates(Array.from(dateStateData.get(selectedYears) || []));
    console.log(state,', filterStates: ', filterStates);
  };

  useConstructor(async () => {
    try {
      console.log('Get Information from Google Spreadsheet');
      const sheet = await loadGoogleSheet();

      const data = getDataFromSheetByYears(sheet);
      
      data.forEach((states, years) => {
        updateDateStateData(years, states || []);
      });
      setFilterStates(Array.from(dateStateData.get(selectedYears) || []));
      // console.log(selectedState,', filterStates: ', filterStates);
      // console.log(dateStateData); // updateDateStateData("68-69", data.get("68-69") || [])
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
    selectedYears && ` (${selectedYears})`
  }`;
  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <div className="Inventory">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header title='Inventory' subTitle={subTitle}/>
          <MexOptionsPanel />
          
          <MexMap
            handleSelectState={handleSelectState}
            selectedState={selectedState}
            filterStates={filterStates}
          />
          
        </>
      )}
    </div>
  );
};

export default Inventory;
