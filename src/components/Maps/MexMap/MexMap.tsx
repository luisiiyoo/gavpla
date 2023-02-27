import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEO_URL =
  'https://gist.githubusercontent.com/leenoah1/535b386ec5f5abdb2142258af395c388/raw/a045778d28609abc036f95702d6a44045ae7ca99/geo-data.json';
const SELECTED_STATE_COLOR = '#2e7509';
const HOVER_STATE_COLOR = '#EAEAEC';
const DEFAULT_STATE_COLOR = undefined;

export interface MexMapProps {
  setSelectedState: Dispatch<SetStateAction<string>>;
  selectedState: string;
}

export const MexMap: React.FC<MexMapProps> = ({
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
            geographies.map((geo) => {
              // console.log("Properties",  geo.properties);
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
                  fill={
                    isStateSelected ? SELECTED_STATE_COLOR : DEFAULT_STATE_COLOR
                  }
                  style={{
                    default: {
                      strokeWidth: 1,
                      stroke: HOVER_STATE_COLOR,
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
