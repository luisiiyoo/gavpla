import React from 'react';

const style: React.CSSProperties = {
  // borderStyle: 'double',
  width: '100%',
  justifyContent: 'center',
  marginTop: '1%',
  marginBottom: '1.5%',
};

export interface TitleProps {
  title: string;
  subTitle?: string;
}

const Header = ({ title, subTitle }: TitleProps) => {
  return (
    <div className="Header" style={style}>
      <h2>{title}</h2>
      {/* <br/> */}
      {subTitle ? <h3>{subTitle}</h3> : undefined}
    </div>
  );
};

export default Header;
