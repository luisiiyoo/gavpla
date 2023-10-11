import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import './style.css';

const UnderConstruction: React.FC = () => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(languageCode, 'UnderConstruction');
  return (
    <div className="UnderConstruction">
      <h3>{translation['message']}</h3>
      <div className="construction" />
    </div>
  );
};

export default UnderConstruction;
