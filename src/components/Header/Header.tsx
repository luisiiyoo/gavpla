import React from 'react';
import './style.css';

export interface TitleProps {
  title: string;
  subTitle?: string;
}

const Header = ({ title, subTitle }: TitleProps) => {
  return (
    <div className="Header">
      <h2>{title}</h2>
      {/* <br/> */}
      {subTitle ? <h3>{subTitle}</h3> : undefined}
    </div>
  );
};

export default Header;
