import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from '@trendmicro/react-sidenav';
import {
  setSelectedRoute,
  setExpandNavBar,
} from 'src/redux/actions/MainComponent';
import { NavItem } from 'src/model/navItem';
import NavBarHeader from 'src/components/NavBarHeader';
import { NavBarProps, OnSelectNavItem, RenderNavItem } from './NavBar.types';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './NavBar.css';

const styleNavItemText = { fontSize: '1.3em', verticalAlign: 'middle' };
const styleNavSubItemText = {
  paddingLeft: 10,
  fontSize: '1.0em',
  verticalAlign: 'middle',
};

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
  return (
    <SideNav.NavItem
      eventKey={completeRoute}
      key={completeRoute}
      data-testid={completeRoute}
    >
      {item.iconClass && (
        <SideNav.NavIcon>
          <i className={`${item.iconClass} NavBar-Icon`} />
        </SideNav.NavIcon>
      )}
      <SideNav.NavText style={isChild ? styleNavSubItemText : styleNavItemText}>
        {item.title}
      </SideNav.NavText>
      {childs.map((child) => renderNavItem(child, true))}
    </SideNav.NavItem>
  );
};

const NavBar: React.FC<NavBarProps> = ({
  history,
  navBarItems,
  navBarTitle,
}) => {
  const { route, expand } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return (
    <SideNav
      expanded={expand}
      onSelect={(selected) => {
        onSelectNavItem(selected, history);
        dispatch(setSelectedRoute(selected));
      }}
      onToggle={(expanded) => {
        dispatch(setExpandNavBar(expanded));
      }}
    >
      <SideNav.Toggle data-testid="toggleNavBar" />
      <NavBarHeader expanded={expand} title={navBarTitle} />
      <SideNav.Nav selected={route}>
        {navBarItems.map((item) => renderNavItem(item))}
      </SideNav.Nav>
    </SideNav>
  );
};

export default NavBar;
