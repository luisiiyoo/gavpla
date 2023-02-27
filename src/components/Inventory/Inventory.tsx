import React, { useState } from 'react';
import { MexMap } from '../Maps/MexMap';
// import {authorize, listData} from 'src/connector/google'

// const useConstructor = (callBack: () => void) => {
//   const [hasBeenCalled, setHasBeenCalled] = useState(false);
//   if (hasBeenCalled) return;
//   callBack();
//   setHasBeenCalled(true);
// };

const HomePage: React.FC = () => {
  // authorize().then(listData).catch(console.error);

  // useConstructor(async () => {
  //   try {

  //     const data = await  listData(await authorize())
  //   } catch (error_) {
  //     setError({
  //       statusCode: error_.statusCode,
  //       message: error_.message,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // });

  const [selectedState, setSelectedState] = useState('');
  return (
    <div className="HomePage">
      <h2>Inventory</h2>
      <h4 className="SelectedState">
        {selectedState ? `México - ${selectedState}` : 'México'}
      </h4>
      <MexMap
        setSelectedState={setSelectedState}
        selectedState={selectedState}
      />
    </div>
  );
};

export default HomePage;
