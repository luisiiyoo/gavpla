import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

import mxStateCenterCoordinates from 'src/data/mx-states-center-geo-data.json';
import mxGeoCoordinates from 'src/data/mx-geo-data.json';
import { MEXICO_STATE_CODE_TO_STATE_NAME } from 'src/utils/constants';
import {
  get_default_bg_color,
  get_filtered_font_color,
  get_hover_bg_color,
  get_selected_bg_color,
} from 'src/utils/helpers';
import './style.css';

export interface MxMapProps {
  selectStateHandler: (state: string) => void;
  filteredStates: string[];
  staticMap: boolean;
}

export const MxMap: React.FC<MxMapProps> = ({
  selectStateHandler,
  filteredStates,
  staticMap,
}) => {
  return (
    <div className="MxMap">
      <div className="MxMap-Geo">
        <ComposableMap
          width={550}
          height={400}
          projection="geoAlbers"
          projectionConfig={{
            scale: 1100,
            center: [-5, 24.6],
          }}
        >
          <Geographies geography={mxGeoCoordinates}>
            {({ geographies }) =>
              geographies.map((geo, key) => {
                const stateCode = geo.properties.STATE_CODE;
                return (
                  <Geography
                    key={key}
                    geography={geo}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (staticMap) return;

                      if (e.nativeEvent.button === 0) {
                        // Left click
                        selectStateHandler(stateCode);
                      } else if (e.nativeEvent.button === 2) {
                        // Right click
                        selectStateHandler('');
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    fill={
                      filteredStates.includes(stateCode)
                        ? get_selected_bg_color()
                        : // :
                          // ? get_filtered_bg_color()
                          get_default_bg_color()
                    }
                    style={{
                      default: {
                        strokeWidth: 1,
                        stroke: get_hover_bg_color(),
                        outline: 'none',
                      },
                      hover: {
                        fill: staticMap ? undefined : get_hover_bg_color(),
                        stroke: get_hover_bg_color(),
                        outline: 'none',
                      },
                      pressed: {
                        // fill: get_hover_bg_color(),
                        stroke: get_hover_bg_color(),
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {Array.from(new Map(Object.entries(mxStateCenterCoordinates))).map(
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
                      selectStateHandler(code);
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
