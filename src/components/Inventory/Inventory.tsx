import React, { useState } from 'react';
import {
  getDataFromSheetByState,
  getDataFromSheetByYears,
  loadGoogleSheet,
} from 'src/connector/google';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';
import { MexMap } from '../Maps/MexMap';

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

  const [selectedYears, setSelectedYears] = useState('68-69');
  const [selectedState, setSelectedState] = useState('');
  const [filterStates, setFilterStates] = useState(new Array<string>());
  const handleSelectState = (state: string) => {
    setSelectedState(state);
    setFilterStates(dateStateData.get(selectedYears) || []);
    console.log('filterStates: ', filterStates);
  };

  useConstructor(async () => {
    try {
      console.log('Get Information from Google Spreadsheet');
      const sheet = await loadGoogleSheet();

      const data = getDataFromSheetByYears(sheet);
      data.forEach((states, years) => {
        updateDateStateData(years, states || []);
      });
      console.log(dateStateData); // updateDateStateData("68-69", data.get("68-69") || [])
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

  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <div className="Inventory">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Inventory</h2>
          <h4 className="SelectedState">
            {selectedState ? `México - ${selectedState}` : 'México'}
          </h4>
          <MexMap
            setSelectedState={setSelectedState}
            selectedState={selectedState}
            filterStates={[]}
          />
        </>
      )}
    </div>
  );
};

export default Inventory;
