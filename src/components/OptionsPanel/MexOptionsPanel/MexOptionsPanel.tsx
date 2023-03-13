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
  handleSelectYear: (year: string) => void;
  handleSelectState: (state: string) => void;
}

const MexOptionsPanel = ({
  yearOptions,
  stateOptions,
  handleSelectYear,
  handleSelectState,
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
          label={'Year:'}
          style={selectOptionsPanelStyle}
          options={yearOptions}
          selectionHandler={handleSelectYear}
          selectionValue={selectedYear}
        />
        <SelectOptionsPanel
          label={'State:'}
          style={selectOptionsPanelStyle}
          options={stateOptions}
          selectionHandler={handleSelectState}
          selectionValue={selectedState}
        />
      </div>
    </div>
  );
};

export default MexOptionsPanel;
