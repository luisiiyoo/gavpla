import React from 'react';
import { Input } from 'reactstrap';
import { TRANSLATIONS } from 'src/language';
import { useSelector } from 'react-redux';
import { DEFAULT_FONT_COLOR, SELECTED_FONT_COLOR } from 'src/utils/constants';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { SerchRequestArgs } from 'src/connector/backend.types';

export interface YearsOptionsPanelProps {
  isValidFromYear: boolean;
  isValidToYear: boolean;
  fromYear: number;
  toYear: number;
  setFromYear: (year: number) => void;
  setToYear: (year: number) => void;
  requestArgs: SerchRequestArgs;
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

export const YearsOptionsPanel = ({
  isValidFromYear,
  fromYear,
  toYear,
  setFromYear,
  setToYear,
  isValidToYear,
  requestArgs,
}: YearsOptionsPanelProps) => {
  const { languageCode, availableYears }: StateType = useSelector(
    (state) => state.main,
  );
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

  return (
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
  );
};
