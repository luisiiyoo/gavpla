import React from 'react';
import { PlateInfoProps } from '../PlateFigures';
import './68_69.css';

export const PrivateCar_1968_1969: React.FC<PlateInfoProps> = ({
  stateCode,
}) => (
  <div className="LicensePlateContainer">
    <div className="LicensePlate Color-A-1968-1969">
      <div className="LP LP-1968-1969">
        <div className="TL Body">A A </div>
        <div className="TC Body"> &nbsp; </div>
        <div className="TR Body"># # #</div>
        <div className="BL Footer">MEX 68</div>
        <div className="BC Footer">
          {' '}
          <span className="Olimpycs">&#8757;&there4;</span>
        </div>
        <div className="BR Footer">69 JAL</div>
      </div>
    </div>
  </div>
);
