import React, { useState } from 'react';
import {
  getDataFromSheetByState,
  getDataFromSheetByYears,
  loadGoogleSheet,
} from 'src/connector/google';
import Loader from '../Loader';
import { MexMap } from '../Maps/MexMap';

const useConstructor = (callBack: () => void) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  useConstructor(async () => {
    try {
      console.log('Get Information from Google Spreadsheet');
      const sheet = await loadGoogleSheet();

      console.log(getDataFromSheetByState(sheet));
      console.log(getDataFromSheetByYears(sheet));
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

  const [selectedState, setSelectedState] = useState('');
  return (
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
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
