import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import './AbbreviationsPanel.css';

const AbbreviationsPanel: React.FC = () => {
  const { stateCodes, languageCode }: StateType = useSelector(
    (state) => state.main,
  );
  const translation = getTranslation(languageCode, 'AbbreviationsPanel');
  return (
    <div className="AbbreviationsPanel">
      <h2>{translation['title']}</h2>
      <div className="AbbreviationsPanel-Block">
        <h4>{translation['states']}</h4>
        <ul>
          {Array.from(Object.keys(stateCodes)).map((code) => (
            <li key={code}>
              <span className="Abbreviations">{code}</span>: {stateCodes[code]}
            </li>
          ))}
        </ul>
      </div>
      <div className="AbbreviationsPanel-Block">
        <h4>{translation['organizations']}</h4>
        <ul>
          <li>
            <span className="Abbreviations">S.A.F.</span>: Servicio de
            Autotransporte Federal
          </li>
          <li>
            <span className="Abbreviations">S.C.T.</span>: Secretaría de
            Comunicaciones y Transportes
          </li>
          <li>
            <span className="Abbreviations">S.E.T.</span>: Servicio Exclusivo de
            Turismo
          </li>
          <li>
            <span className="Abbreviations">S.P.F.</span>: Servicio Público
            Federal
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AbbreviationsPanel;
