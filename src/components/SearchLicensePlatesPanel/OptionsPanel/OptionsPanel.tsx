import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import Select, { ActionMeta, StylesConfig } from 'react-select';
import './style.css';
import {
  BELicensePlateRegionCodes,
  SerchRequestArgs,
} from 'src/connector/backend.types';
import { sortInplaceAlphabetically } from 'src/utils';
import { TRANSLATIONS } from 'src/language';
import { Input } from 'reactstrap';
import { DEFAULT_FONT_COLOR, SELECTED_FONT_COLOR } from 'src/utils/constants';

export interface OptionsPanelProps {
  fromYear: number;
  toYear: number;
  selectedCodes: string[];
  setFromYear: (year: number) => void;
  setToYear: (year: number) => void;
  selectRegionCodesHandler: (codes: string[]) => void;
  requestArgs: SerchRequestArgs;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectGroupedOption {
  options: SelectOption[];
  label: string;
}

export const InputYear = (props) => {
  return (
    <Input
      className="InputYear"
      type="text"
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
};

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
  // const additionalRegionCodeSelectOptions: SelectOption[] = convertCodesToSelectOptions(
  //   languageCode,
  //   additionalRegionCodes,
  // );

  const selectGroupedOptions: SelectGroupedOption[] = [
    // {
    //   label: transalation.areaGroupName,
    //   options: additionalRegionCodeSelectOptions,
    // },
    {
      label: transalation.stateGroupName,
      options: stateCodeSelectOptions,
    },
  ];
  return selectGroupedOptions;
};

export const OptionsPanel = ({
  fromYear,
  toYear,
  selectedCodes,
  selectRegionCodesHandler,
  setFromYear,
  setToYear,
  requestArgs,
}: OptionsPanelProps) => {
  const {
    availableYears,
    stateCodes,
    additionalRegionCodes,
    languageCode,
  }: StateType = useSelector((state) => state.main);
  const translation = TRANSLATIONS.Search[languageCode];

  const handleFromYearChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newVal = event.target.value;
    setFromYear(Number(newVal));
    event.preventDefault();
  };
  const handleToYearChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newVal = event.target.value;
    setToYear(Number(newVal));
    event.preventDefault();
  };

  const hasDifferencesOnSelect =
    JSON.stringify(selectedCodes) === JSON.stringify(requestArgs.region_codes);
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
    <div className="OptionsPanel">
      <div className="OptionsPanel-SelectRegion">
        <h4>{translation.OptionsPanel.titleRegionSelection}</h4>
        <Select
          className="react-select-container"
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
          value={selectedCodes.map((code) => ({
            value: code,
            label: stateCodes[code],
          }))}
          onChange={(newValue: any, actionMeta: ActionMeta<unknown>) => {
            const codes = newValue.map((selected) => selected.value);
            codes.sort() 
            selectRegionCodesHandler(codes);
            return newValue;
          }}
          placeholder={translation.OptionsPanel.placeholderRegionSelection}
        />
      </div>
      <div className="OptionsPanel-SelectYear">
        <h4>{translation.OptionsPanel.titleYearsSelection}</h4>
        <div className="OptionsPanel-SelectYear-Range">
          <InputYear
            name="FromYear"
            placeholder={translation.OptionsPanel.placeholderFromYearsSelection}
            maxLength={4}
            value={fromYear}
            onChange={handleFromYearChanged}
            onBlur={(e) => {
              const year = Number(e.target.value);
              if (year < availableYears.from_year) {
                setFromYear(availableYears.from_year);
              } else if (year > availableYears.to_year || year > toYear) {
                setFromYear(toYear);
              }
            }}
            style={{
              color:
                fromYear === requestArgs.from_year
                  ? DEFAULT_FONT_COLOR
                  : SELECTED_FONT_COLOR,
            }}
          />
          <InputYear
            name="ToYear"
            placeholder={translation.OptionsPanel.placeholderToYearsSelection}
            maxLength={4}
            value={toYear}
            onChange={handleToYearChanged}
            onBlur={(e) => {
              const year = Number(e.target.value);
              if (year > availableYears.to_year) {
                setToYear(availableYears.to_year);
              } else if (year < availableYears.from_year || year < fromYear) {
                setToYear(fromYear);
              }
            }}
            style={{
              color:
                toYear === requestArgs.to_year
                  ? DEFAULT_FONT_COLOR
                  : SELECTED_FONT_COLOR,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionsPanel;
