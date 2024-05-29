import React from 'react';

import { randomFrontierStateCode, randomStateCode } from 'src/utils';

import { PlateInfoProps } from '../PlateFigures';
import './76_77.css';

const COLOR_A = 'Color-A-1976-1977';
const LP_A = 'LP LP-A-1976-1977';

const COLOR_B = 'Color-B-1976-1977';
const LP_B = 'LP LP-B-1976-1977';

const COLOR_C = 'Color-C-1976-1977';
const LP_C = 'LP LP-C-1976-1977';

// const COLOR_D = 'Color-D-1976-1977';
// const LP_D = 'LP LP-D-1976-1977';

// Tipe A
export const DFPrivateCar: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'A'.repeat(3)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
      </div>
    </div>
  </div>
);

export const DFTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">{'#'.repeat(4)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'A'.repeat(2)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'A'.repeat(3)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'A'.repeat(2)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(4)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{''}</div>
        <div className="TC Body">{`${'A'.repeat(2)} ${'#'.repeat(2)}`}</div>
        <div className="TR Body">{''}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; DEM.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'A'.repeat(3)}</div>
        <div className="TC Body"> {''}</div>
        <div className="TR Body">{'#'.repeat(1)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'A'.repeat(2)}</div>
        <div className="TC Body"> {''}</div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
      </div>
    </div>
  </div>
);

// Tipe B

export const DFTaxi: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(2)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
      </div>
    </div>
  </div>
);
export const DFCommercialBus: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(1)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(5)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTrailer: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(5)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(1)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'A'.repeat(3)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'A'.repeat(3)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(2)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'#'.repeat(5)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'A'.repeat(1)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'A'.repeat(1)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'#'.repeat(5)}</div>
        <div className="BL Footer">76</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">77</div>
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
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> {''} </div>
        <div className="TR Body">{'A'.repeat(3)}</div>
        <div className="BL Footer SmallText">76</div>
        <div className="BC Footer SmallText">FRONT {stateCode} MEX</div>
        <div className="BR Footer SmallText">77</div>
      </div>
    </div>
  </div>
);

// Tipe D
// export const FederalSPF: React.FC = () => (
//   <div className="LicensePlateContainer">
//     <div className={`LicensePlate ${COLOR_D}`}>
//       <div className={LP_D}>
//         <div className="TL Body">{'A'.repeat(1)}</div>
//         <div className="TC Body"> {''} </div>
//         <div className="TR Body">{'#'.repeat(4)}</div>
//         <div className="BL Footer">SPF</div>
//         <div className="BC Footer">MEX</div>
//         <div className="BR Footer">76</div>
//       </div>
//     </div>
//   </div>
// );

// export const FederalSET: React.FC = () => (
//   <div className="LicensePlateContainer">
//     <div className={`LicensePlate ${COLOR_D}`}>
//       <div className={LP_D}>
//         <div className="TL Body">{'#'.repeat(1)}</div>
//         <div className="TC Body"> {'A'.repeat(1)} </div>
//         <div className="TR Body">{'A'.repeat(1)}</div>
//         <div className="BL Footer">SET</div>
//         <div className="BC Footer">MEX</div>
//         <div className="BR Footer">76</div>
//       </div>
//     </div>
//   </div>
// );
