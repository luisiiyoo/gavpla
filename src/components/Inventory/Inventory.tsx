import React from 'react';
import frontConfig from 'src/config/server';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import './Inventory.css';

const GEO_URL =
  'https://gist.githubusercontent.com/leenoah1/535b386ec5f5abdb2142258af395c388/raw/a045778d28609abc036f95702d6a44045ae7ca99/geo-data.json';

const MapChart = () => {
  return (
    <div style={{ height: 10 }}>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [100, -20, 3],
          scale: 1300,
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
                  style={{
                    default: {
                      // fill: "#06F",
                      strokeWidth: 2,
                      stroke: '#D6D6DA',
                    },
                    hover: { fill: '#EAEAEC' },
                    pressed: {
                      // fill: "#02A"
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

const HomePage: React.FC = () => (
  <div className="HomePage">
    <h2>Inventory</h2>
    <MapChart />
  </div>
);

export default HomePage;
