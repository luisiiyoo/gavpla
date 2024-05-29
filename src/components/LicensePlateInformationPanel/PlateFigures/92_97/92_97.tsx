import React from 'react';

import { randomFrontierStateCode, randomStateCode } from 'src/utils';

import { PlateInfoProps } from '../PlateFigures';
import './92_97.css';

const COLOR_A = 'Color-A-1992-1997';
const LP_A = 'LP LP-A-1992-1997';

const COLOR_B = 'Color-B-1992-1997';
const LP_B = 'LP LP-B-1992-1997';

const COLOR_C = 'Color-C-1992-1997';
const LP_C = 'LP LP-C-1992-1997';

const COLOR_D = 'Color-D-1992-1997';
const LP_D = 'LP LP-D-1992-1997';

const COLOR_E = 'Color-E-1992-1997';
const LP_E = 'LP LP-E-1992-1997';

const COLOR_F = 'Color-F-1992-1997';
const LP_F = 'LP LP-F-1992-1997';

const COLOR_G = 'Color-G-1992-1997';
const LP_G = 'LP LP-G-1992-1997';

const COLOR_H = 'Color-H-1992-1997';
const LP_H = 'LP LP-H-1992-1997';

const COLOR_I = 'Color-I-1992-1997';
const LP_I = 'LP LP-I-1992-1997';

// Tipe A
export const DFPrivateCar: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">
          {'#'.repeat(3)} {'A'.repeat(3)}{' '}
        </div>
        <div className="BC Footer">DF &nbsp; MEX</div>
      </div>
    </div>
  </div>
);

export const DFTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">
          {'#'.repeat(4)} {'A'.repeat(2)}
        </div>
        <div className="BC Footer">DF &nbsp; MEX</div>
      </div>
    </div>
  </div>
);

export const PrivateCar: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">
          {'A'.repeat(3)}
          {'#'.repeat(4)}
        </div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

export const Truck: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">
          {'A'.repeat(2)}
          {'#'.repeat(5)}
        </div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

export const Dealer: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">{`${'A '.repeat(2)} ${'# '.repeat(2)}`}</div>
        <div className="BC Footer">{stateCode} DEM</div>
      </div>
    </div>
  </div>
);

export const Dealer2: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">{`#${'A'.repeat(2)} ${'#'.repeat(3)}`}</div>
        <div className="BC Footer">{stateCode} DEM</div>
      </div>
    </div>
  </div>
);

export const PrivateBus: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body"> {`#${'A'.repeat(3)}  ${'#'.repeat(2)}`}</div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

export const PrivateTrailer: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">{`#${'A'.repeat(2)}${'#'.repeat(4)}`}</div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

// Tipe B

export const DFTaxi: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">A{'#'.repeat(5)}</div>
        <div className="BC Footer">DF MEX</div>
      </div>
    </div>
  </div>
);
export const DFCommercialBus: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'#'.repeat(1)} {'#'.repeat(5)}
        </div>
        <div className="BC Footer">DF MEX</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'#'.repeat(3)} {'#'.repeat(3)}
        </div>
        <div className="BC Footer">DF MEX</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTrailer: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'#'.repeat(5)} {'#'.repeat(1)}
        </div>
        <div className="BC Footer">DF MEX</div>
      </div>
    </div>
  </div>
);

export const Taxi: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'#'.repeat(4)}
          {'A'.repeat(3)}
        </div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

export const CommercialTruck: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          0{'A'.repeat(3)}
          {'#'.repeat(3)}
        </div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

export const CommercialBus: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'#'.repeat(6)}
          {'A'.repeat(1)}
        </div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

export const CommercialTrailer: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'A'.repeat(1)}
          {'#'.repeat(6)}
        </div>
        <div className="BC Footer">{stateCode} MEX</div>
      </div>
    </div>
  </div>
);

// Tipe C
export const Frontier: React.FC<PlateInfoProps> = ({
  stateCode = randomFrontierStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_C}`}>
      <div className={LP_C}>
        <div className="TC Body">
          {'#'.repeat(3)}
          {'A'.repeat(3)}#
        </div>
        <div className="BC Footer">FRONT {stateCode} MEX</div>
      </div>
    </div>
  </div>
);

// Tipe D
export const FederalSCT: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_D}`}>
      <div className={LP_D}>
        <div className="TC Body"> {`${'#'.repeat(4)} ${'A'.repeat(2)}`}</div>
        <div className="BC Footer">SCT AVT</div>
      </div>
    </div>
  </div>
);

// Tipe E
export const FederalSPFTrailer: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_E}`}>
      <div className={LP_E}>
        <div className="TC Body">
          {' '}
          {`${'#'.repeat(3)}${'A'.repeat(2)}#`}&#9641;
        </div>
        <div className="BC Footer">SPF MEX</div>
      </div>
    </div>
  </div>
);
export const FederalSPFTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_E}`}>
      <div className={LP_E}>
        <div className="TC Body"> {`${'#'.repeat(3)}${'A'.repeat(2)}`}#</div>
        <div className="BC Footer">SPF MEX</div>
      </div>
    </div>
  </div>
);

// Tipe F
export const FederalSET: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_F}`}>
      <div className={LP_F}>
        <div className="TC Body"> {`${'#'.repeat(3)}${'A'.repeat(2)}`}#</div>
        <div className="BC Footer">SET MEX</div>
      </div>
    </div>
  </div>
);

// Type G
export const FederalSPFRental: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_G}`}>
      <div className={LP_G}>
        <div className="TC Body"> {`${'#'.repeat(3)}${'A'.repeat(2)}`}#</div>
        <div className="BC Footer">SPF RENTA MEX</div>
      </div>
    </div>
  </div>
);

// Type H
export const FederalSPFRental2: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_H}`}>
      <div className={LP_H}>
        <div className="TC Body"> {`${'#'.repeat(3)}${'A'.repeat(2)}`}#</div>
        <div className="BC Footer">SPF RENTA MEX</div>
      </div>
    </div>
  </div>
);

// Type I
export const FederalSPFBorder: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_I}`}>
      <div className={LP_I}>
        <div className="TC Header X-SmallText">T. TRANSFRONTERIZO</div>
        <div className="MC Body"> {`${'#'.repeat(3)}${'A'.repeat(2)}`}#</div>
        <div className="BC Footer X-SmallText">SPF MEX</div>
      </div>
    </div>
  </div>
);
