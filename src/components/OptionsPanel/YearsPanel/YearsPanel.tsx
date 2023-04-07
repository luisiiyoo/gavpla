import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';

export interface YearsPanelProps {
  selectedYear: string;
  yearOptions: Array<string>;
  filteredYears: Array<string>;
  selectYearHandler: (year: string) => void;
}

const YearsPanel = ({
  selectedYear,
  yearOptions,
  filteredYears,
  selectYearHandler,
}: YearsPanelProps) => {
  const { languageCode } = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'MexicoCollection');

  return (
    <div
      className="YearsPanel"
      style={{
        display: 'inline-block',
        textAlign: 'center',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <label>{translation['Year'] + ': '}</label>
      {yearOptions.map((opt, key) => (
        <YearChoice
          label={opt}
          key={key}
          selectionHandler={selectYearHandler}
          isFiltered={filteredYears.includes(opt)}
          isSelected={selectedYear === opt}
        />
      ))}
    </div>
  );
};

export interface YearsChoiceProps {
  label: string;
  isFiltered: boolean;
  isSelected: boolean;
  selectionHandler: (year: string) => void;
}

const YearChoice = ({
  label,
  selectionHandler,
  isFiltered,
  isSelected,
}: YearsChoiceProps) => {
  const filtered = isFiltered ? 'Filtered' : undefined;
  const selected = isSelected ? 'Selected' : undefined;
  return (
    <button
      className={`YearChoice ${filtered} ${selected}`}
      value={label}
      onClick={(e) => {
        e.preventDefault();
        selectionHandler(e.currentTarget.value);
      }}
    >
      {label}
    </button>
  );
};

export default YearsPanel;
