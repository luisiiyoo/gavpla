import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import './style.css';
import { SerchRequestArgs } from 'src/connector/backend.types';
import { VehicleOptionsPanel } from './VehicleOptionsPanel';
import { YearsOptionsPanel } from './YearsOptionsPanel';
import { RegionOptionsPanel } from './RegionOptionsPanel';

export interface OptionsPanelProps {
  fromYear: number;
  toYear: number;
  selectedCodes: string[];
  excludedVehicleTypes: Set<string>;
  setFromYear: (year: number) => void;
  setToYear: (year: number) => void;
  selectRegionCodesHandler: (codes: string[]) => void;
  setExcludedVehicleTypes: (selectedTypes: Set<string>) => void;
  onlyStates: boolean;
  onlyStatesHandler: (flag: boolean) => void;
  requestArgs: SerchRequestArgs;
}

export const OptionsPanel = ({
  fromYear,
  toYear,
  selectedCodes,
  selectRegionCodesHandler,
  setFromYear,
  setToYear,
  excludedVehicleTypes,
  setExcludedVehicleTypes,
  onlyStates,
  onlyStatesHandler,
  requestArgs,
}: OptionsPanelProps) => {
  const { availableYears }: StateType = useSelector((state) => state.main);

  const hasDifferencesOnSelect: boolean =
    JSON.stringify(selectedCodes) === JSON.stringify(requestArgs.region_codes);

  let isValidFromYear = true;
  if (fromYear < availableYears.from_year) {
    isValidFromYear = false;
  } else if (fromYear > availableYears.to_year || fromYear > toYear) {
    isValidFromYear = false;
  }

  let isValidToYear = true;
  if (toYear > availableYears.to_year) {
    isValidToYear = false;
  } else if (toYear < availableYears.from_year || toYear < fromYear) {
    isValidToYear = false;
  }
  return (
    <div className="OptionsPanel">
      <VehicleOptionsPanel
        excludedVehicleTypes={excludedVehicleTypes}
        setExcludedVehicleTypes={setExcludedVehicleTypes}
      />
      <YearsOptionsPanel
        isValidFromYear={isValidFromYear}
        isValidToYear={isValidToYear}
        fromYear={fromYear}
        toYear={toYear}
        setFromYear={setFromYear}
        setToYear={setToYear}
        requestArgs={requestArgs}
      />
      <RegionOptionsPanel
        hasDifferencesOnSelect={hasDifferencesOnSelect}
        selectedCodes={selectedCodes}
        selectRegionCodesHandler={selectRegionCodesHandler}
        onlyStates={onlyStates}
        onlyStatesHandler={onlyStatesHandler}
      />
    </div>
  );
};

export default OptionsPanel;
