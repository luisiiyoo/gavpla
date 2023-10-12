import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from '@trendmicro/react-sidenav';
import {
  setSelectedRoute,
  setExpandNavBar,
} from 'src/redux/actions/MainComponent';
import { AbstractNavItem, NavItem } from 'src/routers/Router.types';
import NavBarHeader from 'src/components/NavBar/NavBarHeader';
import { NavBarProps, OnSelectNavItem, RenderNavItem } from './NavBar.types';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './NavBar.css';
import { navigationItems } from 'src/routers';
import { getTranslation } from 'src/language';
import { isASmallDeviceByWidth } from 'src/utils';

const onSelectNavItem: OnSelectNavItem = (selected, history) => {
  const {
    location: { pathname },
  } = history;
  const to = '/' + selected;
  if (pathname !== to) history.push(to);
};

const renderNavItem: RenderNavItem = (item: NavItem, isChild = false) => {
  const completeRoute = item.route;
  const childs = item.childs || [];
  const isOverPopulated: boolean = childs.length >= 10;
  return (
    <SideNav.NavItem
      eventKey={completeRoute}
      key={completeRoute}
      subnavClassName="SubNavLuis"
      subnavStyle={{
        height: isOverPopulated ? '50vh' : 'inherit',
        overflow: 'overlay',
      }}
    >
      {item.iconClass && (
        <SideNav.NavIcon>
          <i className={`${item.iconClass} NavBar-Icon`} />
        </SideNav.NavIcon>
      )}
      <SideNav.NavText className={isChild ? 'NavSubItemText' : 'NavItemText'}>
        {item.title}
      </SideNav.NavText>
      {childs.map((child) => renderNavItem(child, true))}
    </SideNav.NavItem>
  );
};

const NavBar: React.FC<NavBarProps> = ({ history, navBarTitle }) => {
  const { route, expand, languageCode } = useSelector(
    (state: any) => state.main,
  );
  const dispatch = useDispatch();
  const translation = getTranslation(languageCode, 'NavBar');

  return (
    <SideNav
      className={`SideNavBar ${expand ? 'SideNavBarExpanded' : ''}`}
      expanded={expand}
      onSelect={(selected) => {
        onSelectNavItem(selected, history);
        dispatch(setSelectedRoute(selected));
        if (isASmallDeviceByWidth(600)) {
          dispatch(setExpandNavBar(false));
        }
      }}
      onToggle={(expanded) => {
        dispatch(setExpandNavBar(expanded));
      }}
      style={
        {
          // position:"fixed",
          // overflowY:"auto",
          // overflowX:"hidden"
        }
      }
    >
      <SideNav.Toggle />
      <NavBarHeader expanded={expand} title={navBarTitle} />
      <SideNav.Nav selected={route}>
        {navigationItems.map((item: AbstractNavItem) => {
          item.title = translation[item.route] || item.title;
          return renderNavItem(item);
        })}
      </SideNav.Nav>
    </SideNav>
  );
};

export default NavBar;
