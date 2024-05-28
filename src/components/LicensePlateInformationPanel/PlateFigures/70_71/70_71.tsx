import React from 'react';

import { randomStateCode } from 'src/utils';

import { PlateInfoProps } from '../PlateFigures';
import './70_71.css';

const COLOR_A = 'Color-A-1970-1971';
const LP_A = 'LP LP-A-1970-1971';

const COLOR_B = 'Color-B-1970-1971';
const LP_B = 'LP LP-B-1970-1971';

// const COLOR_C = 'Color-C-1970-1971';
// const LP_C = 'LP LP-C-1970-1971';

const COLOR_D = 'Color-D-1970-1971';
const LP_D = 'LP LP-D-1970-1971';

// Tipe A
export const PrivateCar: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);
export const DFPrivateCar: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">{'A'.repeat(3)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(2)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
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
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);

export const DFTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(2)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
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
        <div className="TL Body">{'#'.repeat(1)}</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">{'A'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; DEM.</div>
        <div className="BR Footer">71</div>
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
        <div className="TL Body">{'A'.repeat(1)}</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);

export const DFPrivateBus: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">{'A'.repeat(1)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
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
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">{'#'.repeat(2)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);
export const DFPrivateTrailer: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">{'A'.repeat(2)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);

// Tipe B

export const DFTaxi: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);
export const DFCommercialBus: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTrailer: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
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
        <div className="TL Body">{'A'.repeat(1)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(4)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
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
        <div className="TL Body">{'#'.repeat(4)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(1)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
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
        <div className="TL Body">{'#A'}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
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
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A#'}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);

// Tipe C
// export const Frontier: React.FC<PlateInfoProps> = ({
//   stateCode = randomFrontierStateCode(),
// }) => (
//   <div className="LicensePlateContainer">
//     <div className={`LicensePlate ${COLOR_C}`}>
//       <div className={LP_C}>
//         <div className="TL Body">{'#'.repeat(4)}</div>
//         <div className="TC Body"> &#xb7; </div>
//         <div className="TR Body">{'A'.repeat(1)}</div>
//         <div className="BL Footer">70</div>
//         <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
//         <div className="BR Footer">71</div>
//       </div>
//     </div>
//   </div>
// );

// Tipe D
export const FederalSPFBus: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_D}`}>
      <div className={LP_D}>
        <div className="TL Body">{'#'.repeat(2)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A#'}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">S.P.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);

export const FederalSPFTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_D}`}>
      <div className={LP_D}>
        <div className="TL Body">{'#A'}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(2)}</div>
        <div className="BL Footer">70</div>
        <div className="BC Footer">S.P.F. &nbsp; MEX.</div>
        <div className="BR Footer">71</div>
      </div>
    </div>
  </div>
);
