import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import './LicensePlateInformationPanel.css';
import * as figures_70_71 from './PlateFigures/70_71/70_71';
import * as figures_72_73 from './PlateFigures/72_73/72_73';
import * as figures_74_75 from './PlateFigures/74_75/74_75';
import * as figures_76_77 from './PlateFigures/76_77/76_77';
import * as figures_78_79 from './PlateFigures/78_79/78_79';
import * as figures_80_81 from './PlateFigures/80_81/80_81';
import * as figures_82_83 from './PlateFigures/82_83/82_83';

import LicensePlateFigures, {
  FiguresContentType,
} from './PlateFigures/PlateFigures';

const LicensePlateInformationPanel: React.FC = () => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(
    languageCode,
    'IdentifyPlatesByVehiclePage',
  );
  const [selectedYearSeries, setSelectedYearSeries] = useState('1982-1983');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const itemsMap = new Map<string, FiguresContentType>();
  itemsMap.set('1970-1971', figures_70_71);
  itemsMap.set('1972-1973', figures_72_73);
  itemsMap.set('1974-1975', figures_74_75);
  itemsMap.set('1976-1977', figures_76_77);
  itemsMap.set('1978-1979', figures_78_79);
  itemsMap.set('1980-1981', figures_80_81);
  itemsMap.set('1982-1983', figures_82_83);

  const yearsOptions = Array.from(itemsMap.keys());
  const selectedContent = itemsMap.get(selectedYearSeries);
  return (
    <div className="LicensePlateInformationPanel">
      <h2>{translation['title']}</h2>
      <div className="LicensePlateInformationPanel-Options">
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
          <DropdownToggle caret color="white">
            {translation['select']}
          </DropdownToggle>
          <DropdownMenu>
            {yearsOptions.map((option) => (
              <DropdownItem
                key={option}
                onClick={() => {
                  setSelectedYearSeries(option);
                }}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      {!!selectedContent && (
        <div className="LicensePlateInformationPanel-Figures">
          <h4>{selectedYearSeries.replace('-', ' - ')}</h4>
          <LicensePlateFigures figures={selectedContent} />
        </div>
      )}
    </div>
  );
};

export default LicensePlateInformationPanel;
