import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';

import './PlateFigures/PlateFigures.css';
import * as LP_68_69 from './PlateFigures/68_69/68_69';
import * as LP_72_73 from './PlateFigures/72_73/72_73';

const LicensePlateInformationPanel: React.FC = () => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(languageCode, 'InformationPage');

  const stateCode = 'JAL';
  const frontierStateCode = 'SON';
  return (
    <div className="LicensePlateInformationPanel">
      <h2>{translation['title']}</h2>
      <p>
        <h4>1968-1969</h4>
        <LP_68_69.PrivateCar_1968_1969 stateCode={stateCode} />
      </p>
      <br />
      <p>
        <h4>1972-1973</h4>
        <LP_72_73.DFPrivateCar />
        <LP_72_73.DFTruck />
        <LP_72_73.DFTaxi />
        <LP_72_73.DFCommercialBus />
        <LP_72_73.DFCommercialTruck />
        <LP_72_73.DFCommercialTrailer />

        <LP_72_73.PrivateCar stateCode={stateCode} />
        <LP_72_73.Truck stateCode={stateCode} />
        <LP_72_73.Dealer stateCode={stateCode} />
        <LP_72_73.PrivateBus stateCode={stateCode} />
        <LP_72_73.PrivateTrailer stateCode={stateCode} />
        <LP_72_73.Taxi stateCode={stateCode} />
        <LP_72_73.CommercialBus stateCode={stateCode} />
        <LP_72_73.CommercialTruck stateCode={stateCode} />
        <LP_72_73.CommercialTrailer stateCode={stateCode} />

        <LP_72_73.Frontier stateCode={frontierStateCode} />

        <LP_72_73.Federal />
      </p>
    </div>
  );
};

export default LicensePlateInformationPanel;
