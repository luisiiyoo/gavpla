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
import { Form, Input, FormGroup, Label } from 'reactstrap';
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
      type="number"
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
    stateCodes,
    additionalRegionCodes,
    languageCode,
    availableYears,
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
      <div className="OptionsPanel-VehicleTypes">
        <h4>{translation.OptionsPanel.titleVehicleSelection}</h4>
        <Form className="OptionsPanel-FormVehicleTypes">
          <FormGroup switch>
            <Input type="switch" role="switch" />
            <Label check>
              <i className="fa-solid fa-car" />
            </Label>
          </FormGroup>
          <FormGroup switch>
            <Input type="switch" role="switch" />
            <Label check>
              <i className="fa-solid fa-bus" />
            </Label>
          </FormGroup>
          <FormGroup switch>
            <Input type="switch" role="switch" />
            <Label check>
              <i className="fa-solid fa-flag" />
            </Label>
          </FormGroup>
          <FormGroup switch>
            <Input type="switch" role="switch" />
            <Label check>
              <i className="fa-solid fa-arrow-down-up-across-line" />
            </Label>
          </FormGroup>
          <FormGroup switch>
            <Input type="switch" role="switch" />
            <Label check>
              <i className="fa-solid fa-motorcycle" />
            </Label>
          </FormGroup>
          <FormGroup switch>
            <Input type="switch" role="switch" />
            <Label check>
              <i className="fa-solid fa-bicycle" />
            </Label>
          </FormGroup>
        </Form>
      </div>

      <div className="OptionsPanel-SelectYear">
        <h4>{translation.OptionsPanel.titleYearsSelection}</h4>
        <div className="OptionsPanel-SelectYear-Range">
          <InputYear
            name="FromYear"
            valid={isValidFromYear}
            invalid={!isValidFromYear}
            placeholder={translation.OptionsPanel.placeholderFromYearsSelection}
            maxLength={4}
            value={Number(fromYear).toString().replace(/^[0]+/g, '')}
            min={availableYears.from_year}
            max={availableYears.to_year}
            onChange={handleFromYearChanged}
            onBlur={(e) => {
              const year = Number(e.target.value);
              setFromYear(year);
              // if (year < availableYears.from_year) {
              //   setFromYear(availableYears.from_year);
              // } else if (year > availableYears.to_year || year > toYear) {
              //   setFromYear(toYear);
              // }
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
            valid={isValidToYear}
            invalid={!isValidToYear}
            placeholder={translation.OptionsPanel.placeholderToYearsSelection}
            maxLength={4}
            value={Number(toYear).toString().replace(/^[0]+/g, '')}
            min={availableYears.from_year}
            max={availableYears.to_year}
            onChange={handleToYearChanged}
            onBlur={(e) => {
              const year = Number(e.target.value);
              setToYear(year);
              // if (year > availableYears.to_year) {
              //   setToYear(availableYears.to_year);
              // } else if (year < availableYears.from_year || year < fromYear) {
              //   setToYear(fromYear);
              // }
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
    </div>
  );
};

export default OptionsPanel;
