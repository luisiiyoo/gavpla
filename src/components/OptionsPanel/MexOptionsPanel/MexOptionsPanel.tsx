import React from 'react';
import SelectOptionsPanel from '../SelectOptionsPanel';

const style: React.CSSProperties = {
  // borderStyle: 'double',
  width: '100%',
  marginTop: '1.5%',
  marginBottom: '1.5%',
  display: 'flex',
  justifyContent: 'center',
};

export interface MexOptionsPanelProps {
  selectedState: string;
  selectedYear: string;
  yearOptions: Array<string>;
  stateOptions: Array<string>;
  selectYearHandler: (year: string) => void;
  selectStateHandler: (state: string) => void;
}

const MexOptionsPanel = ({
  yearOptions,
  stateOptions,
  selectYearHandler,
  selectStateHandler,
  selectedState,
  selectedYear,
}: MexOptionsPanelProps) => {
  const selectOptionsPanelStyle: React.CSSProperties = {
    width: '30%',
    textAlign: 'center',
  };
  return (
    <div className="MexOptionsPanel" style={style}>
      <div style={{ ...style, justifyContent: 'space-between', width: '70%' }}>
        <SelectOptionsPanel
          label={'State:'}
          style={selectOptionsPanelStyle}
          options={stateOptions}
          selectionHandler={selectStateHandler}
          selectionValue={selectedState}
        />
        <SelectOptionsPanel
          label={'Year:'}
          style={selectOptionsPanelStyle}
          options={yearOptions}
          selectionHandler={selectYearHandler}
          selectionValue={selectedYear}
        />
      </div>
    </div>
  );
};

export default MexOptionsPanel;
