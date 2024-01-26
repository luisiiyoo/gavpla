import React from 'react';
import { TRANSLATIONS } from 'src/language';
import { useSelector } from 'react-redux';
import Select, { ActionMeta, StylesConfig } from 'react-select';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { BELicensePlateRegionCodes } from 'src/connector/backend.types';
import { sortInplaceAlphabetically } from 'src/utils';
import { DEFAULT_FONT_COLOR, SELECTED_FONT_COLOR } from 'src/utils/constants';

export interface RegionOptionsPanelProps {
  hasDifferencesOnSelect: boolean;
  selectedCodes: string[];
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

export const RegionOptionsPanel = ({
  hasDifferencesOnSelect,
  selectedCodes,
  selectRegionCodesHandler,
}: RegionOptionsPanelProps) => {
  const { languageCode, stateCodes }: StateType = useSelector(
    (state) => state.main,
  );
  const translation = TRANSLATIONS.Search[languageCode];

  const convertCodesToSelectGroupedOptions = (
    languageCode: string,
    stateCodes: BELicensePlateRegionCodes,
  ): SelectGroupedOption[] => {
    const transalation = TRANSLATIONS.Search[languageCode].OptionsPanel;

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

    const stateCodeSelectOptions: SelectOption[] = convertCodesToSelectOptions(
      languageCode,
      stateCodes,
    );

    const selectGroupedOptions: SelectGroupedOption[] = [
      {
        label: transalation.stateGroupName,
        options: stateCodeSelectOptions,
      },
    ];
    return selectGroupedOptions;
  };

  const selectStyles: StylesConfig = {
    menu: (styles) => ({
      ...styles,
      // width:selectRegionWidth,
      // minWidth:selectRegionWidth,
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      color: 'black',
    }),
    container: (styles) => ({
      ...styles,
    }),
    option: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      color: 'black',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: hasDifferencesOnSelect ? DEFAULT_FONT_COLOR : SELECTED_FONT_COLOR,
    }),
  };
  return (
    <div className="OptionsPanel-SelectRegion">
      <h4>{translation.OptionsPanel.titleRegionSelection}</h4>
      <Select
        className="react-select-container"
        name="AreaSelectOptions"
        options={convertCodesToSelectGroupedOptions(languageCode, stateCodes)}
        isClearable
        isMulti
        isLoading={false}
        styles={selectStyles}
        value={selectedCodes.map((code) => ({
          value: code,
          label: stateCodes[code],
        }))}
        onChange={(newValue: any, actionMeta: ActionMeta<unknown>) => {
          const indexDF = newValue.map((e) => e.value).indexOf('DF');
          const indexCDMX = newValue.map((e) => e.value).indexOf('CDMX');
          if (indexDF > -1 && indexCDMX === -1) {
            newValue.splice(indexDF, 1);
          }
          if (indexCDMX > -1 && indexDF === -1) {
            newValue.splice(indexCDMX, 1);
          }

          const codes = newValue.map((selected) => selected.value);
          codes.sort();
          console.log('luis', newValue);
          selectRegionCodesHandler(codes);
          return newValue;
        }}
        placeholder={translation.OptionsPanel.placeholderRegionSelection}
      />
    </div>
  );
};
