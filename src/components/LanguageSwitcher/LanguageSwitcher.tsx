import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslation, languages } from 'src/language';
import Select, { ActionMeta, StylesConfig, components } from 'react-select';
import { setLanguage } from 'src/redux/actions/MainComponent/MainComponent';

const style = {
  marginRight: '4%',
  fontSize: '18px',
  alignItems: 'center',
  verticalAlign: 'middle',
};

const fontSize = '10';
const height = 30;
const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    color: 'black',
    fontSize,
    height: height,
    minHeight: height,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    color: 'black',
    fontSize,
  }),
  input: (styles) => ({ ...styles, fontSize, margin: '0px' }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: height,
    padding: '0 6px',
  }),

  indicatorSeparator: (state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: height,
  }),
};

const { Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img src={props.data.icon} style={{ width: 36 }} alt={props.data.label} />
    {props.data.label}
  </Option>
);

const LanguageSwitcher = () => {
  const { languageCode } = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'LanguageSwitcher');

  const dispatch = useDispatch();
  const selectedLanguage = languages.filter(
    (lang) => lang.languageCode === languageCode,
  )[0];

  return (
    <div className="LanguageSwitcher">
      <div style={style}>
        {translation['label']}:{' '}
        <img
          style={{ marginTop: '110', height: '22px' }}
          src={selectedLanguage.flag}
          alt={selectedLanguage.languageCode}
        ></img>
        {/* <div > */}
        <Select
          options={languages.map((lang) => ({
            value: lang.languageCode,
            label: lang.name,
            icon: lang.flag,
          }))}
          isLoading={false}
          styles={selectStyles}
          value={{
            value: selectedLanguage.languageCode,
            label: selectedLanguage.name,
            icon: selectedLanguage.flag,
          }}
          onChange={(newValue: any, actionMeta: ActionMeta<unknown>) => {
            dispatch(setLanguage(newValue.value));
            return newValue;
          }}
          components={{ Option: IconOption }}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
