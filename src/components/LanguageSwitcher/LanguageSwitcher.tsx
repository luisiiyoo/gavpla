import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';

export interface LanguageSwitcherProps {}

const style = {
  marginRight: '4%',
  fontSize: '18px',
  alignItems: 'center',
  verticalAlign: 'middle',
};

const LanguageSwitcher = ({}: LanguageSwitcherProps) => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(languageCode, 'LanguageSwitcher');

  return (
    <div className="LanguageSwitcher">
      <div style={style}>
        <small>
          {translation['label']}: {languageCode}
        </small>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
