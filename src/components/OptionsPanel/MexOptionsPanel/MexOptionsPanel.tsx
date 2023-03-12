import React from 'react';
import { YearOptionsPanel } from '../YearStateOptionsPanel';

const style: React.CSSProperties = {
  width: '100%',
  borderStyle: 'double',
  marginTop: '1.5%',
  marginBottom: '1.5%',
  display: 'flex',
  justifyContent: 'center',
  // justifyContent: "space-between",
};

export interface MexOptionsPanelProps {}

export const MexOptionsPanel = ({}: MexOptionsPanelProps) => {
  return (
    <div className="MexOptionsPanel" style={style}>
      <div style={{ ...style, justifyContent: 'space-between', width: '80%' }}>
        <YearOptionsPanel />
        {/* <YearOptionsPanel /> */}
        <YearOptionsPanel />
      </div>
    </div>
  );
};
