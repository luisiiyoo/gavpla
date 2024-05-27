import React from 'react';
import { PlateInfoProps } from '../PlateFigures';
import './72_73.css';

const COLOR_A = 'Color-A-1972-1973';
const LP_A = 'LP LP-A-1972-1973';

const COLOR_B = 'Color-B-1972-1973';
const LP_B = 'LP LP-B-1972-1973';

const COLOR_C = 'Color-C-1972-1973';
const LP_C = 'LP LP-C-1972-1973';

const COLOR_D = 'Color-D-1972-1973';
const LP_D = 'LP LP-D-1972-1973';

// Tipe A
export const DFPrivateCar: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">### </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">AAA</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const DFTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">####</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">A A</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const PrivateCar: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">AAA </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">###</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const Truck: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">A A </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">####</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const Dealer: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">A A</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body"># #</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; DEM.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const PrivateBus: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">A A A</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">#</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const PrivateTrailer: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">A A</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body"># # #</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

// Tipe B

export const DFTaxi: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">### </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">##</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);
export const DFCommercialBus: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body"># </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">#####</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">###</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">###</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTrailer: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">#####</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">#</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const Taxi: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">## </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">AAA</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const CommercialTruck: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">AAA </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">##</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const CommercialBus: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">AAAAA </div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">#</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const CommercialTrailer: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">A</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">#####</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

// Tipe C
export const Frontier: React.FC<PlateInfoProps> = ({ stateCode }) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_C}`}>
      <div className={LP_C}>
        <div className="TL Body">####</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">A</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

// Tipe D
export const FederalSPF: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_D}`}>
      <div className={LP_D}>
        <div className="TL Body">A</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">####</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">S.P.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);
