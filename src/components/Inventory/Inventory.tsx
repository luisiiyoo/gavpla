import React, { useState } from 'react';
import frontConfig from 'src/config/server';
import { MexMap } from '../Maps/MexMap';

const HomePage: React.FC = () => {
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
