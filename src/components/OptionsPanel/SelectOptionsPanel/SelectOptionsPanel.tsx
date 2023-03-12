import React from 'react';
import Select, { StylesConfig } from 'react-select';

const fontSize = 'x-large';
const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    color: 'black',
    fontSize,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    color: 'black',
    fontSize,
  }),
  input: (styles) => ({ ...styles, fontSize }),
};

const style: React.CSSProperties = {
  width: '30%',
  verticalAlign: 'top',
  textAlign: 'center',
};
const options = [
  { value: '68-69', label: '68-69' },
  { value: '70-71', label: '70-71' },
  { value: '72-73', label: '72-73' },
  // { value: '68-69', label: '1968-1969' },
  // { value: '70-71', label: '1970-1971' },
  // { value: '72-73', label: '1972-1973' }
];

export type OptionsSelect = {
  value: string;
  label: string;
};

export interface SelectOptionsPanelProps {
  label: string;
  options?: OptionsSelect;
}

const SelectOptionsPanel = ({ label }: SelectOptionsPanelProps) => {
  return (
    <div className="SelectOptionsPanel" style={style}>
      <label>{label}</label>
      <Select
        options={options}
        isClearable
        isLoading={false}
        styles={selectStyles}
        // value={""}
      />
    </div>
  );
};

export default SelectOptionsPanel;
