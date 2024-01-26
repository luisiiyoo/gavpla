import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import './style.css';

export interface MissingDetailsPanelProps {
  filteredYears: string[];
  filteredStates: string[];
  yearOptions: string[];
  stateOptions: string[];
  selectedState: string;
  selectedYear: string;
}

const MissingDetailsPanel = ({
  filteredStates,
  filteredYears,
  yearOptions,
  stateOptions,
  selectedState,
  selectedYear,
}: MissingDetailsPanelProps) => {
  const { languageCode, stateCodes } = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'General');

  const [isOpen, setIsOpen] = useState(true);
  const showMissingDetailsByYears = selectedState !== '';
  const showMissingDetailsByStates = selectedYear !== '';

  let missingYears = yearOptions.filter((x) => !filteredYears.includes(x));
  let missingStats = stateOptions.filter((x) => !filteredStates.includes(x));

  return (
    <div className="MissingDetailsPanel">
      <Collapsible
        // className='MissingDetailsPanel-Collapsible'
        open={isOpen}
        onTriggerClosing={() => {
          setIsOpen(false);
        }}
        onTriggerOpening={() => {
          setIsOpen(true);
        }}
        trigger={
          isOpen
            ? translation['MissingDetails']['HideDetails']
            : translation['MissingDetails']['SeeDetails']
        }
        // triggerClassName="MissingDetailsPanel-Collapsible-Trigger"
      >
        <div className="MissingDetailsPanel-Body">
          {showMissingDetailsByYears && (
            <>
              <p>
                <strong>{`${translation['State']} : ${stateCodes[selectedState]}`}</strong>
                <br />
                {/* {`${translation['MissingDetails']['Having']} : ${filteredYears.length}   -   ${translation['MissingDetails']['Missing']} : ${missingYears.length}`} */}
                {`${translation['MissingDetails']['Missing']} : ${missingYears.length}`}
                <br />
                {missingYears.map((year, key) => (
                  <span key={key} className="YearChoice MissingItem">
                    {year}
                  </span>
                ))}
              </p>
            </>
          )}
          {showMissingDetailsByStates && (
            <>
              <p>
                <strong>{`${translation['Year']} : ${selectedYear}`}</strong>
                <br />
                {/* {`${translation['MissingDetails']['Having']} : ${filteredStates.length}   -   ${translation['MissingDetails']['Missing']} : ${missingStats.length}`} */}
                {`${translation['MissingDetails']['Missing']} : ${missingStats.length}`}
                <br />
                {missingStats.map((state, key) => (
                  <span key={key} className="YearChoice MissingItem">
                    {stateCodes[state]}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>
      </Collapsible>
    </div>
  );
};

export default MissingDetailsPanel;
