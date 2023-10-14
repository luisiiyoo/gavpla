import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslation, languages } from 'src/language';
import Select, { ActionMeta, StylesConfig, components } from 'react-select';
import { setLanguage } from 'src/redux/actions/Main/Main';
import './style.css';

const selectFontSize = '1.8vh';
const selectHeight = '3vh';
const selectStyles: StylesConfig = {
  // container: (styles) => ({
  //   ...styles,
  //   display: 'inline-block',
  //   position: 'relative',
  //   width: '12.2vh',
  //   textAlign: 'left',
  // }), Handle by LanguageSelector-Dropdown className
  control: (styles) => ({
    ...styles,
    backgroundColor: 'rgb(255, 255, 255, 0.9)',
    color: 'black',
    fontSize: selectFontSize,
    // height: selectHeight,
    minHeight: selectHeight,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: 'rgb(255, 255, 255, 0.9)',
    color: 'black',
    fontSize: selectFontSize,
    display: 'inline-block',
    verticalAlign: 'middle',
  }),
  input: (styles) => ({ ...styles, fontSize: selectFontSize, margin: '0px' }),
  valueContainer: (provided, state) => ({
    ...provided,
    // height: selectHeight,
    padding: '0 6px',
  }),

  indicatorSeparator: (state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: selectHeight,
  }),
};

interface SelectLabelComponentProps {
  icon: string;
  text: string;
}

const SelectLabelComponent = ({ icon, text }: SelectLabelComponentProps) => {
  const flagIconStyle = {
    width: '2.3vh',
    height: '2.3vh',
    verticalAlign: 'sub',
  };
  return (
    <div className="SelectLabelComponent">
      <img src={icon} style={flagIconStyle} alt={text} />
      &nbsp;
      {text}
    </div>
  );
};

const SelectOption = (props) => (
  <components.Option {...props}>
    <SelectLabelComponent icon={props.data.icon} text={props.data.label} />
  </components.Option>
);

const LanguageSelector = () => {
  const { languageCode } = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'LanguageSelector');

  const dispatch = useDispatch();
  const selectedLanguage = languages.filter(
    (lang) => lang.languageCode === languageCode,
  )[0];

  return (
    <div className="LanguageSelector">
      {translation['label']}:{' '}
      <Select
        className="LanguageSelector-Dropdown"
        options={languages.map((lang) => ({
          value: lang.languageCode,
          label: lang.languageCode,
          icon: lang.flag,
        }))}
        isLoading={false}
        styles={selectStyles}
        value={{
          value: selectedLanguage.languageCode,
          label: (
            <SelectLabelComponent
              icon={selectedLanguage.flag}
              text={selectedLanguage.languageCode}
            />
          ),
          icon: selectedLanguage.flag,
        }}
        onChange={(newValue: any, actionMeta: ActionMeta<unknown>) => {
          dispatch(setLanguage(newValue.value));
          return newValue;
        }}
        components={{
          Option: SelectOption,
          // ValueContainer:InputValueContainer
        }}
      />
      {/* 
      <img
        style={{ marginTop: '110', height: '22px' }}
        src={selectedLanguage.flag}
        alt={selectedLanguage.languageCode}
      /> */}
    </div>
  );
};

export default LanguageSelector;
