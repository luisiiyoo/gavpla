import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { get_selected_bg_color, get_selected_font_color } from 'src/utils';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';

export interface MissingDetailsPanelProps {
  filteredYears: string[];
  filteredStates: string[];
  yearOptions: string[];
  stateOptions: string[];
  selectedState: string;
  selectedYear: string;
}

const style: React.CSSProperties = {
  paddingTop: '10px',
  margin: '10px',
  paddingBottom: '10px',
  alignContent: 'center',
  textAlign: 'center',
  display: 'block',
  justifyContent: 'center',
  fontSize: 'small',
  // backgroundColor: "rgba(0, 0, 0, 0.3)",
};
const triggerStyle = {
  padding: '5px 10px',
  width: '100%',
  borderRadius: '25px',
  fontSize: 'small',
};
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
    <div className="MissingDetailsPanel" style={style}>
      <Collapsible
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
        triggerStyle={{
          ...triggerStyle,
          backgroundColor: get_selected_bg_color(),
        }}
      >
        <div
          style={{
            borderStyle: 'double',
            borderColor: get_selected_font_color(),
          }}
        >
          {showMissingDetailsByYears && (
            <>
              <p>
                <strong>{`${translation['State']} : ${stateCodes[selectedState]}`}</strong>
                <br />
                {/* {`${filteredYears.length} plates in the collection, ${missingYears.length} missing.`} */}
                {`${translation['MissingDetails']['Having']} : ${filteredYears.length}   -   ${translation['MissingDetails']['Missing']} : ${missingYears.length}`}
              </p>
              <p>
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
                {`${translation['MissingDetails']['Having']} : ${filteredStates.length}   -   ${translation['MissingDetails']['Missing']} : ${missingStats.length}`}
              </p>
              <p>
                {missingStats.map((state, key) => (
                  <span key={key} className="YearChoice MissingItem">
                    {state}
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
