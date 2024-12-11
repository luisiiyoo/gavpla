import React from 'react';

import { MxMap } from '../Maps/MxMap';
import {
  LicensePlateItemsPanel,
  LicensePlateItemsPanelProps,
} from './LicensePlateItemsPanel/LicensePlateItemsPanel';

export type LicensePlatesPanelProps = LicensePlateItemsPanelProps & {
  regionCodesToFilter?: string[];
  displayMap?: boolean;
  staticMap?: boolean;
  selectStateHandler: (state: string) => void;
};

export const LicensePlatesPanel: React.FC<LicensePlatesPanelProps> = ({
  platesDataArray,
  regionCodesToFilter,
  selectStateHandler,
  staticMap = true,
  displayMap = true,
  hideStateName = false,
  hideYears = false,
  hideVehicleType = false,
}) => {
  const filteredStates =
    regionCodesToFilter ||
    Array.from(new Set(platesDataArray.map((d) => d.region_code)));
  return (
    <div className="LicensePlatesPanel">
      {!displayMap ? undefined : (
        <MxMap
          selectStateHandler={selectStateHandler}
          filteredStates={filteredStates}
          staticMap={staticMap}
        />
      )}
      <LicensePlateItemsPanel
        platesDataArray={platesDataArray}
        hideStateName={hideStateName}
        hideYears={hideYears}
        hideVehicleType={hideVehicleType}
      />
    </div>
  );
};
