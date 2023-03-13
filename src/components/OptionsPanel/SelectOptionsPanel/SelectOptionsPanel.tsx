import React from 'react';
import Select, { ActionMeta, StylesConfig } from 'react-select';

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

export type OptionsSelect = {
  value: string;
  label: string;
};

export interface SelectOptionsPanelProps {
  label: string;
  options?: Array<string>;
  style?: React.CSSProperties;
  selectionHandler: (state: string) => void;
  selectionValue: string;
}

const convertArrayToOptions = (values: Array<string>) => {
  return values.map((val) => ({ value: val, label: val }));
};

const SelectOptionsPanel = ({
  label,
  style,
  options,
  selectionHandler,
  selectionValue,
}: SelectOptionsPanelProps) => {
  const convertedOptions = convertArrayToOptions(options || []);

  return (
    <div className="SelectOptionsPanel" style={style}>
      <label>{label}</label>
      <Select
        options={convertedOptions}
        isClearable
        isLoading={false}
        styles={selectStyles}
        value={{ value: selectionValue, label: selectionValue }}
        onChange={(newValue: any, actionMeta: ActionMeta<unknown>) => {
          selectionHandler(!!newValue ? newValue.value : '');
          return newValue;
        }}
      />
    </div>
  );
};

export default SelectOptionsPanel;
