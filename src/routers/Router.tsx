import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
  isExpandedNavBar
}) => {
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
          path={`/${ROUTES.GAMES_FINISHED}`}
          exact={true}
          component={() => <GamesBoard finished={true} />}
        />
        <Route
          path={`/${ROUTES.GAMES_IN_PROGRESS}`}
          exact={true}
          component={() => <GamesBoard finished={false} />}
        />
        <Route path={`/${ROUTES.PLAY}`} 
        exact={true} 
        component={() => <PlayGame />} />
        <Route path={`/${ROUTES.CREATE}`}  exact={true} component={() => <CreateGame />} />
        <Route component={() => <PageNotFound />} />
      </Switch>
    </div>
  );
};

const Routes: React.FC<RouterProps> = () => {
  const { main } = useSelector((state) => state);
  const { expand: isExpandedNavBar } = main;

  return (
    <BrowserRouter>
      <Route
        render={({ history }) => (
          <NavBar
            history={history}
            navBarItems={navigationItems}
            navBarTitle={""}
          />
        )}
      />
      <div className="Container">
        <MainComponent
          isExpandedNavBar={isExpandedNavBar}
        />
      </div>
    </BrowserRouter>
  );
};

export default Routes;
