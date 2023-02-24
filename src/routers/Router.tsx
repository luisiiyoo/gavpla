import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavItemChild } from 'src/model/navItem';
import { RouterProps, MainComponentProps } from './Router.types';
import PageNotFound from '../components/PageNotFound';
import NavBar from '../components/NavBar';
import HomePage from '../components/HomePage';
import GamesBoard from '../components/GamesBoard';
import PlayGame from '../components/PlayGame';
import CreateGame from '../components/CreateGame';
import { navigationItems, ROUTES } from './routes';
import './Router.css';

const MAX_NAVBAR_MARGIN = 240;
const MIN_NAVBAR_MARGIN = 64;

const MainComponent: React.FC<MainComponentProps> = ({
  isExpandedNavBar,
  navBarItems,
}) => {
  const routes: NavItemChild[] = [];
  navBarItems.forEach(({ childs = [] }) => {
    childs.forEach((journeyRoute: NavItemChild) => {
      routes.push(journeyRoute);
    });
  });

  return (
    <div
      className="MainComponent"
      data-testid="mainComponent"
      style={{
        marginLeft: isExpandedNavBar ? MAX_NAVBAR_MARGIN : MIN_NAVBAR_MARGIN,
      }}
    >
      <Switch>
        <Route path="/" exact={true} component={() => <HomePage />} />
        <Route
          path={`/${ROUTES.HOME}`}
          exact={true}
          component={() => <HomePage />}
        />
        <Route
          path={`/${ROUTES.GAMES_FINISHED}`}
          component={() => <GamesBoard finished={true} />}
        />
        <Route
          path={`/${ROUTES.GAMES_IN_PROGRESS}`}
          component={() => <GamesBoard finished={false} />}
        />
        <Route path={`/${ROUTES.PLAY}`} component={() => <PlayGame />} />
        <Route path={`/${ROUTES.CREATE}`} component={() => <CreateGame />} />
        <Route component={() => <PageNotFound />} />
      </Switch>
    </div>
  );
};

const Routes: React.FC<RouterProps> = ({ navBarItems = navigationItems }) => {
  const { main } = useSelector((state) => state);
  const { expand: isExpandedNavBar } = main;

  return (
    <BrowserRouter>
      <Route
        render={({ history }) => (
          <NavBar
            history={history}
            navBarItems={navBarItems}
            navBarTitle={""}
          />
        )}
      />
      <div className="Container">
        <MainComponent
          isExpandedNavBar={isExpandedNavBar}
          navBarItems={navBarItems}
        />
      </div>
    </BrowserRouter>
  );
};

export default Routes;
