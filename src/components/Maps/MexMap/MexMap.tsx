import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

import mexStateCenterCoordinates from 'src/components/Maps/MexMap/MexStateCenterCoordinates.json';
import { MEXICO_STATE_CODE_TO_STATE_NAME } from 'src/utils/constants';
import {
  get_default_bg_color,
  get_filtered_bg_color,
  get_filtered_font_color,
  get_hover_bg_color,
  get_selected_bg_color,
} from 'src/utils/helpers';

const GEO_URL =
  'https://gist.githubusercontent.com/leenoah1/535b386ec5f5abdb2142258af395c388/raw/a045778d28609abc036f95702d6a44045ae7ca99/geo-data.json';

const style: React.CSSProperties = {
  // borderStyle: 'double',
  width: '70%',
  alignContent: 'center',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
};

export interface MexMapProps {
  selectStateHandler: (state: string) => void;
  selectedState: string;
  filteredStates: string[];
}

export interface Geo {
  stateName: string;
  coordinates: number[][];
}

export const MexMap: React.FC<MexMapProps> = ({
  selectStateHandler,
  selectedState,
  filteredStates,
}) => {
  return (
    <div
      className="MexMap"
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <div style={style}>
        <ComposableMap
          width={550}
          height={400}
          projection="geoAlbers"
          projectionConfig={{
            scale: 1100,
            center: [-5, 24.6],
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.NAME_1;
                const isStateSelected = selectedState === stateName;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (e.nativeEvent.button === 0) {
                        // Left click
                        selectStateHandler(stateName);
                      } else if (e.nativeEvent.button === 2) {
                        // Right click
                        selectStateHandler('');
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    fill={
                      isStateSelected
                        ? get_selected_bg_color()
                        : filteredStates.includes(stateName)
                        ? get_filtered_bg_color()
                        : get_default_bg_color()
                    }
                    style={{
                      default: {
                        strokeWidth: 1,
                        stroke: get_hover_bg_color(),
                        outline: 'none',
                      },
                      hover: {
                        fill: get_hover_bg_color(),
                        outline: 'none',
                      },
                      pressed: {
                        fill: get_hover_bg_color(),
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {Array.from(new Map(Object.entries(mexStateCenterCoordinates))).map(
            ([stateName, { code, center }], key) => {
              const isFiltered = filteredStates.includes(stateName);
              return (
                <Marker
                  key={key}
                  coordinates={center}
                  // onMouseDown={(e)=>{console.log(e)}}
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                >
                  <text
                    textAnchor="middle"
                    fill={
                      isFiltered
                        ? get_filtered_font_color()
                        : get_hover_bg_color()
                    }
                    fontSize={4}
                    fontWeight="bold"
                    style={{ cursor: 'default' }}
                    onClick={(e) => {
                      e.preventDefault();
                      const stateName =
                        MEXICO_STATE_CODE_TO_STATE_NAME.get(code) || '';
                      selectStateHandler(stateName);
                    }}
                  >
                    {code}
                  </text>
                </Marker>
              );
            },
          )}
        </ComposableMap>
      </div>
    </div>
  );
};

// const getPolygonCenter = (geo) => {
//   const geoCoordinates = geo.geometry.coordinates;
//   const coordinates: number[][] = [];
//   flatArray(geoCoordinates, coordinates);
//   const coordinatesCenter = calculatePolygonCenter(coordinates);
//   return coordinatesCenter;
// };

// const flatArray = (array: Array<any>, result: number[][]) => {
//   if (
//     array.length === 2 &&
//     !Array.isArray(array[0]) &&
//     !Array.isArray(array[1])
//   ) {
//     result.push(array);
//     return;
//   }
//   array.forEach((elem) => {
//     flatArray(elem, result);
//   });
// };

// const calculatePolygonCenter = (arr: number[][]) => {
//   const x: number[] = arr.map((xy) => xy[0]);
//   const y: number[] = arr.map((xy) => xy[1]);
//   const cx: number = (Math.min(...x) + Math.max(...x)) / 2;
//   const cy: number = (Math.min(...y) + Math.max(...y)) / 2;
//   return [cx, cy];
// };
