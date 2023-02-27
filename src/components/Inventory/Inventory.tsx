import React, { Dispatch, SetStateAction, useState } from 'react';
import frontConfig from 'src/config/server';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './Inventory.css';
import './Maps.css';

const GEO_URL =
  'https://gist.githubusercontent.com/leenoah1/535b386ec5f5abdb2142258af395c388/raw/a045778d28609abc036f95702d6a44045ae7ca99/geo-data.json';
const SELECTED_STATE_COLOR = '#2e7509';
const HOVER_STATE_COLOR = '#EAEAEC';

export interface MapChartProps {
  setSelectedState: Dispatch<SetStateAction<string>>;
  selectedState: string;
}

const MapChart: React.FC<MapChartProps> = ({
  setSelectedState,
  selectedState,
}) => {
  return (
    <div style={{ borderStyle: 'double' }}>
      <ComposableMap
        width={800}
        height={400}
        projection="geoAlbers"
        projectionConfig={{
          scale: 1100,
          center: [-5, 25],
        }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo, index) => {
              // console.log("Hola", index, geo.properties);
              const stateName = geo.properties.NAME_1;
              const isStateSelected = selectedState === stateName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  // onMouseEnter={(event) => {
                  //   const {
                  //     target: { value },
                  //   } = event;
                  //   console.log(event);
                  //   console.log(geo.properties);
                  //   setSelectedState(`${geo.properties.NAME_1}`);
                  // }}
                  // onMouseLeave={() => {
                  //   setSelectedState('');
                  // }}
                  onClick={() => setSelectedState(stateName)}
                  fill={isStateSelected ? SELECTED_STATE_COLOR : undefined}
                  style={{
                    default: {
                      strokeWidth: 2,
                      stroke: HOVER_STATE_COLOR, //'#D6D6DA',
                      outline: 'none',
                    },
                    hover: {
                      fill: HOVER_STATE_COLOR,
                      outline: 'none',
                    },
                    pressed: {
                      fill: SELECTED_STATE_COLOR,
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  return (
    <div className="HomePage">
      <h2>Inventory</h2>
      <h4 className="SelectedState">
        {selectedState ? `México - ${selectedState}` : 'México'}
      </h4>
      <MapChart
        setSelectedState={setSelectedState}
        selectedState={selectedState}
      />
    </div>
  );
};

export default HomePage;
