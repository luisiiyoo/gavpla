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

export interface MexOptionsPanelProps {}

const MexOptionsPanel = ({}: MexOptionsPanelProps) => {
  return (
    <div className="MexOptionsPanel box--gradient silver" style={style}>
      <div style={{ ...style, justifyContent: 'space-between', width: '80%' }}>
        <SelectOptionsPanel label={'Year:'} />
        {/* <YearOptionsPanel /> */}
        <SelectOptionsPanel label={'States'} />
      </div>
    </div>
  );
};

export default MexOptionsPanel;
