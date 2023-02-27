import React, { Dispatch, SetStateAction, useState } from 'react';
import frontConfig from 'src/config/server';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './Inventory.css';
import './Maps.css';

const GEO_URL =
  'https://gist.githubusercontent.com/leenoah1/535b386ec5f5abdb2142258af395c388/raw/a045778d28609abc036f95702d6a44045ae7ca99/geo-data.json';

export interface MapChartProps {
  setTooltipContent: Dispatch<SetStateAction<string>>;
}

const MapChart: React.FC<MapChartProps> = ({ setTooltipContent }) => {
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

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(event) => {
                    const {
                      target: { value },
                    } = event;
                    console.log(event);
                    console.log(geo.properties);
                    setTooltipContent(`${geo.properties.NAME_1}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  style={{
                    default: {
                      strokeWidth: 2,
                      stroke: '#D6D6DA',
                      outline: 'none',
                    },
                    hover: {
                      fill: '#EAEAEC',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#2e7509',
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
  const [stateName, setStateName] = useState('');
  return (
    <div className="HomePage">
      <h2>Inventory</h2>
      <h4 className="stateName">
        {stateName ? `México - ${stateName}` : 'México'}
      </h4>
      <MapChart setTooltipContent={setStateName} />
    </div>
  );
};

export default HomePage;
