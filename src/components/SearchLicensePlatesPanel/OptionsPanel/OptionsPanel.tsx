import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import Select, { ActionMeta, StylesConfig } from 'react-select';
import './style.css';
import { BELicensePlateRegionCodes } from 'src/connector/backend.types';
import { sortInplaceAlphabetically } from 'src/utils';
import { TRANSLATIONS } from 'src/language';

export interface OptionsPanelProps {
  selectRegionCodesHandler: (codes: string[]) => void;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectGroupedOption {
  options: SelectOption[];
  label: string;
}

const convertCodesToSelectOptions = (
  languageCode: string,
  stateCodes: BELicensePlateRegionCodes,
): SelectOption[] => {
  const transalation = TRANSLATIONS.RegionNames[languageCode];
  const selectOptions = Object.entries(stateCodes).map(([code, name]) => {
    return {
      value: code,
      label: transalation.hasOwnProperty(code) ? transalation[code] : name,
    };
  });
  sortInplaceAlphabetically(selectOptions, 'label');
  return selectOptions;
};

const convertCodesToSelectGroupedOptions = (
  languageCode: string,
  stateCodes: BELicensePlateRegionCodes,
  additionalRegionCodes: BELicensePlateRegionCodes,
): SelectGroupedOption[] => {
  const transalation = TRANSLATIONS.Search[languageCode].OptionsPanel;

  const stateCodeSelectOptions: SelectOption[] = convertCodesToSelectOptions(
    languageCode,
    stateCodes,
  );
  const additionalRegionCodeSelectOptions: SelectOption[] = convertCodesToSelectOptions(
    languageCode,
    additionalRegionCodes,
  );

  const selectGroupedOptions: SelectGroupedOption[] = [
    {
      label: transalation.areaGroupName,
      options: additionalRegionCodeSelectOptions,
    },
    {
      label: transalation.stateGroupName,
      options: stateCodeSelectOptions,
    },
  ];
  return selectGroupedOptions;
};

const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    color: 'black',
    // fontSize,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    color: 'black',
    // fontSize,
  }),
  input: (styles) => ({ ...styles }),
};

export const OptionsPanel = ({
  selectRegionCodesHandler,
}: OptionsPanelProps) => {
  const {
    availableYears,
    stateCodes,
    additionalRegionCodes,
    languageCode,
  }: StateType = useSelector((state) => state.main);
  const translation = TRANSLATIONS.Search[languageCode];
  return (
    <div className="OptionsPanel">
      <Select
        name="AreaSelectOptions"
        options={convertCodesToSelectGroupedOptions(
          languageCode,
          stateCodes,
          additionalRegionCodes,
        )}
        isClearable
        isMulti
        isLoading={false}
        styles={selectStyles}
        // value={{ value: selectionValue, label: selectionValue }}
        onChange={(newValue: any, actionMeta: ActionMeta<unknown>) => {
          const codes = newValue.map((selected) => selected.value);
          selectRegionCodesHandler(codes);
          return newValue;
        }}
        placeholder={translation.OptionsPanel.regionSelection}
      />
    </div>
  );
};

export default OptionsPanel;
