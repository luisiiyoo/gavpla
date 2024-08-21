import React from 'react';
import { randomStateCode } from 'src/utils';
import { PlateInfoProps } from '../PlateFigures';
import './68_69.css';

const COLOR_A = 'Color-A-1968-1969';
const LP_A = 'LP LP-A-1968-1969';

const COLOR_B = 'Color-B-1968-1969';
const LP_B = 'LP LP-B-1968-1969';

// const COLOR_C = 'Color-C-1968-1969';
// const LP_C = 'LP LP-C-1968-1969';

const COLOR_D = 'Color-D-1968-1969';
const LP_D = 'LP LP-D-1968-1969';

const COLOR_E = 'Color-E-1968-1969';
const LP_E = 'LP LP-E-1968-1969';

const LP_X = 'LP LP-X-1968-1969';
// const LP_Y = 'LP LP-Y-1968-1969';

const OlimpycSpan: React.FC = () => (
  <span className="Olimpycs">&#8757;&there4;</span>
);

export const PrivateCar: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">
          {'A '.repeat(2)}
          {'# '.repeat(3)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const PrivateCar2: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">
          {'A'.repeat(2)} {'#'.repeat(4)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const DFPrivateCar: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_A}>
        <div className="TC Body">
          {'# '.repeat(3)}
          {'A '.repeat(2)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 D.F.</div>
      </div>
    </div>
  </div>
);

export const Truck: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_X}>
        <div className="TL Body VerticalText">A</div>
        <div className="TR Body">{'# '.repeat(4)}</div>
        <div className="BL Body VerticalText">A</div>
        <div className="BR Footer HorizontalText">
          68
          <OlimpycSpan />
          69 {stateCode}
        </div>
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
          {'# '.repeat(4)} {'A'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const Taxi2: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'# '.repeat(3)} - {'A'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const DFTaxi: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'#'.repeat(2)} - {'#'.repeat(3)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 D.F.</div>
      </div>
    </div>
  </div>
);

export const DFTaxi2: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'# '.repeat(2)} - {'# '.repeat(2)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 D.F.</div>
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
          {'# '.repeat(4)} {'J'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const CommercialBus2: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'# '.repeat(3)} - {'J'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const DFCommercialBus: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">3 {'# '.repeat(4)}</div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 D.F.</div>
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
          {'# '.repeat(4)} {'S'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const CommercialTruck2: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'# '.repeat(3)} - {'S'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTruck: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">6 {'# '.repeat(4)}</div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 D.F.</div>
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
          {'# '.repeat(4)} {'R'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const CommercialTrailer2: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">
          {'# '.repeat(3)} - {'R'.repeat(1)}
        </div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);
export const DFCommercialTrailer: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_B}`}>
      <div className={LP_B}>
        <div className="TC Body">8 {'# '.repeat(4)}</div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 D.F.</div>
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
        <div className="TC Body">{'A - ' + '#'.repeat(3)}</div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const PrivateTrailer: React.FC<PlateInfoProps> = ({
  stateCode = randomStateCode(),
}) => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_A}`}>
      <div className={LP_X}>
        <div className="TL Body VerticalText">R</div>
        <div className="TR Body">{'# '.repeat(4)}</div>
        <div className="BL Body VerticalText">A</div>
        <div className="BR Footer HorizontalText">
          68
          <OlimpycSpan />
          69 {stateCode}
        </div>
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
        <div className="TC Body">{'A '.repeat(2) + ' - ' + '# '.repeat(2)}</div>
        <div className="BL Footer">DEM 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
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
        <div className="TC Body">{'A '.repeat(1) + ' - ' + '# '.repeat(3)}</div>
        <div className="BL Footer">DEM 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 {stateCode}</div>
      </div>
    </div>
  </div>
);

export const FederalSCT: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_D}`}>
      <div className={LP_D}>
        <div className="TC Body">{'A ' + '# '.repeat(4)}</div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 S.C.T.</div>
      </div>
    </div>
  </div>
);

export const FederalSET: React.FC = () => (
  <div className="LicensePlateContainer">
    <div className={`LicensePlate ${COLOR_E}`}>
      <div className={LP_E}>
        <div className="TC Body">{'A ' + '# '.repeat(4)}</div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <OlimpycSpan />
        </div>
        <div className="BR Footer">69 S.E.T.</div>
      </div>
    </div>
  </div>
);
