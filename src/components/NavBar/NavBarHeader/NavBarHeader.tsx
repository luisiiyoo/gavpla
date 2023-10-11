import React from 'react';
import { NavBarHeaderProps } from './NavBarHeader.types';
import './NavBarHeader.css';

const NavBarHeader: React.FC<NavBarHeaderProps> = ({ title, expanded }) => {
  return (
    <div
      data-testid="headerContainer"
      className="NavBarHeader"
      style={{ display: expanded ? 'block' : 'none' }}
    >
      <div data-testid="headerTitle" className="NavBarHeader-Title">
        {title}
      </div>
    </div>
  );
};

export default NavBarHeader;
