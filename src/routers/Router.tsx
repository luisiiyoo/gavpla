import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RouterProps, MainComponentProps } from './Router.types';
import { navigationFCItems, navigationItems } from './routes';
import PageNotFound from '../components/PageNotFound';
import NavBar from '../components/NavBar';
import './Router.css';

const MAX_NAVBAR_MARGIN = 240;
const MIN_NAVBAR_MARGIN = 64;

const MainComponent: React.FC<MainComponentProps> = ({ isExpandedNavBar }) => {
  return (
    <div
      className="MainComponent"
      data-testid="mainComponent"
      style={{
        marginLeft: isExpandedNavBar ? MAX_NAVBAR_MARGIN : MIN_NAVBAR_MARGIN,
      }}
    >
      <Switch>
        {navigationFCItems.map((item, key) => (
          <Route
            key={key}
            path={`/${item.route}`}
            exact={true}
            component={item.functionalComponent}
          />
        ))}
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
        render={({ history }) => <NavBar history={history} navBarTitle={''} />}
      />
      <div className="Container">
        <MainComponent isExpandedNavBar={isExpandedNavBar} />
      </div>
    </BrowserRouter>
  );
};

export default Routes;
