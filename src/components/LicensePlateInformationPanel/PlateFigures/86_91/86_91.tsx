import React from 'react';

import { randomFrontierStateCode, randomStateCode } from 'src/utils';

import { PlateInfoProps } from '../PlateFigures';
import './86_91.css';

const COLOR_A = 'Color-A-1986-1991';
const LP_A = 'LP LP-A-1986-1991';

const COLOR_B = 'Color-B-1986-1991';
const LP_B = 'LP LP-B-1986-1991';

const COLOR_C = 'Color-C-1986-1991';
const LP_C = 'LP LP-C-1986-1991';

const COLOR_D = 'Color-D-1986-1991';
const LP_D = 'LP LP-D-1986-1991';

const COLOR_E = 'Color-E-1986-1991';
const LP_E = 'LP LP-E-1986-1991';

const COLOR_F = 'Color-F-1986-1991';
const LP_F = 'LP LP-F-1986-1991';

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
          {'A'.repeat(3)} {'#'.repeat(3)}
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
          {'A'.repeat(2)} {'#'.repeat(4)}
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

export const PrivateBus: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body"> {`${'A'.repeat(3)}  ${'#'.repeat(1)}`}</div>
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
        <div className="TC Body">
          {'A'.repeat(2)} {'#'.repeat(3)}
        </div>
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
        <div className="TC Body">
          {'#'.repeat(3)} {'#'.repeat(2)}
        </div>
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
          {'#'.repeat(2)} {'A'.repeat(3)}
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
          {'A'.repeat(3)} {'#'.repeat(2)}
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
          {'#'.repeat(5)} {'A'.repeat(1)}
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
          {'A'.repeat(1)} {'#'.repeat(5)}
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
          {'#'.repeat(3)} {'A'.repeat(3)}
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
        <div className="TC Body"> {`${'#'.repeat(3)} ${'A'.repeat(3)}`}</div>
        <div className="BC Footer">SCT AVT</div>
      </div>
    </div>
  </div>
);

// Tipe E
export const FederalSET: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_E}`}>
      <div className={LP_E}>
        <div className="TC Body"> {`${'#'.repeat(3)} ${'A'.repeat(2)}`}</div>
        <div className="BC Footer">SET MEX</div>
      </div>
    </div>
  </div>
);

// Tipe F
export const FederalSAFBus: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_F}`}>
      <div className={LP_F}>
        <div className="TC Body"> {`${'#'.repeat(3)} ${'A'.repeat(2)}`}</div>
        <div className="BC Footer">SAF MEX</div>
      </div>
    </div>
  </div>
);

export const FederalSAFTrailer: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_F}`}>
      <div className={LP_F}>
        <div className="TC Body">
          {' '}
          {`${'#'.repeat(3)} ${'A'.repeat(2)}`}&#9641;
        </div>
        <div className="BC Footer">SAF MEX</div>
      </div>
    </div>
  </div>
);
