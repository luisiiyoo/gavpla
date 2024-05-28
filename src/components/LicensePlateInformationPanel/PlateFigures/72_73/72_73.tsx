import React, { useState, useEffect } from 'react';

import { randomFrontierStateCode, randomStateCode } from 'src/utils';

import {
  CommercialBusHeader,
  CommercialTrailerHeader,
  CommercialTruckHeader,
  DealerHeader,
  FederalSPFHeader,
  FrontierHeader,
  PlateInfoProps,
  PrivateBusHeader,
  PrivateCarHeader,
  PrivateTrailerHeader,
  TaxiHeader,
  TruckHeader,
} from '../PlateFigures';
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
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(3)}</div>
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
        <div className="TL Body">{'#'.repeat(4)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(2)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TR Body">{'#'.repeat(4)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TL Body">{'A'.repeat(2)}</div>
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">{'#'.repeat(2)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; DEM.</div>
        <div className="BR Footer">73</div>
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
        <div className="TC Body"> &#xb7;</div>
        <div className="TR Body">{'#'.repeat(1)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TR Body">{'#'.repeat(3)}</div>
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
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(2)}</div>
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
        <div className="TL Body">{'#'.repeat(1)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(5)}</div>
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
        <div className="TL Body">{'#'.repeat(3)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(3)}</div>
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
        <div className="TL Body">{'#'.repeat(5)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(1)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">D.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(3)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(2)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(1)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(5)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">{stateCode}. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
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
        <div className="TL Body">{'#'.repeat(4)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'A'.repeat(1)}</div>
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
        <div className="TL Body">{'A'.repeat(1)}</div>
        <div className="TC Body"> &#xb7; </div>
        <div className="TR Body">{'#'.repeat(4)}</div>
        <div className="BL Footer">72</div>
        <div className="BC Footer">S.P.F. &nbsp; MEX.</div>
        <div className="BR Footer">73</div>
      </div>
    </div>
  </div>
);

export const LicensePlateFigures_72_73: React.FC = () => {
  const [stateCode, setStateCode] = useState(randomStateCode());
  const [frontierStateCode, setFrontierStateCode] = useState(
    randomFrontierStateCode(),
  );

  useEffect(() => {
    const updateStateCode = () => {
      setStateCode(randomStateCode());
      setFrontierStateCode(randomFrontierStateCode());
    };

    const interval = setInterval(updateStateCode, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="LicensePlateFigures">
      {/* <h4>1972 - 1973</h4> */}
      {/* PrivateCar - Truck - Taxi */}
      <table>
        <thead>
          <tr>
            <th>
              <PrivateCarHeader />
            </th>
            <th>
              <TruckHeader />
            </th>
            <th>
              <TaxiHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PrivateCarHeader />
              <PrivateCar stateCode={stateCode} />
              <DFPrivateCar />
            </td>
            <td>
              <TruckHeader />
              <Truck stateCode={stateCode} />
              <DFTruck />
            </td>
            <td>
              <TaxiHeader />
              <Taxi stateCode={stateCode} />
              <DFTaxi />
            </td>
          </tr>
        </tbody>
      </table>
      {/* CommercialBus - CommercialTruck - CommercialTrailer */}
      <table>
        <thead>
          <tr>
            <th>
              <CommercialBusHeader />
            </th>
            <th>
              <CommercialTruckHeader />
            </th>
            <th>
              <CommercialTrailerHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CommercialBusHeader />
              <CommercialBus stateCode={stateCode} />
              <DFCommercialBus />
            </td>
            <td>
              <CommercialTruckHeader />
              <CommercialTruck stateCode={stateCode} />
              <DFCommercialTruck />
            </td>
            <td>
              <CommercialTrailerHeader />
              <CommercialTrailer stateCode={stateCode} />
              <DFCommercialTrailer />
            </td>
          </tr>
        </tbody>
      </table>
      {/* PrivateBus - PrivateTrailer - Dealer */}
      <table>
        <thead>
          <tr>
            <th>
              <PrivateBusHeader />
            </th>
            <th>
              <PrivateTrailerHeader />
            </th>
            <th>
              <DealerHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PrivateBusHeader />
              <PrivateBus stateCode={stateCode} />
            </td>
            <td>
              <PrivateTrailerHeader />
              <PrivateTrailer stateCode={stateCode} />
            </td>
            <td>
              <DealerHeader />
              <Dealer stateCode={stateCode} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Frontier - FederalSPF */}
      <table>
        <thead>
          <tr>
            <th>
              <FrontierHeader />
            </th>
            <th>
              <FederalSPFHeader />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FrontierHeader />
              <Frontier stateCode={frontierStateCode} />
            </td>
            <td>
              <FederalSPFHeader />
              <FederalSPF />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LicensePlateFigures_72_73;
