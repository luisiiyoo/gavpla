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
import * as figures_72_73 from './PlateFigures/72_73/72_73';
import * as figures_70_71 from './PlateFigures/70_71/70_71';
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
  const [selectedYearSeries, setSelectedYearSeries] = useState('1970 - 1971');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const itemsMap = new Map<string, FiguresContentType>();
  itemsMap.set('1970 - 1971', figures_70_71);
  itemsMap.set('1972 - 1973', figures_72_73);

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
          <h4>{selectedYearSeries}</h4>
          <LicensePlateFigures figures={selectedContent} />
        </div>
      )}
    </div>
  );
};

export default LicensePlateInformationPanel;
