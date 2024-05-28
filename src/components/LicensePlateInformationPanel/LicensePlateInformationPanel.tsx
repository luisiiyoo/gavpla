import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';

import './PlateFigures/PlateFigures.css';
import * as figures_72_73 from './PlateFigures/72_73/72_73';
import LicensePlateFigures from './PlateFigures/PlateFigures';

const LicensePlateInformationPanel: React.FC = () => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(languageCode, 'InformationPage');

  return (
    <div className="LicensePlateInformationPanel">
      <h2>{translation['title']}</h2>

      <h4>1972 - 1973</h4>
      <LicensePlateFigures figures={figures_72_73} />
    </div>
  );
};

export default LicensePlateInformationPanel;
