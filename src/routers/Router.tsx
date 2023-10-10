import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  RouterProps,
  MainComponentProps as BodyComponentProps,
} from './Router.types';
import { navigationFCItems } from './routes';
import PageNotFound from '../components/PageNotFound';
import NavBar from '../components/NavBar';
import './Router.css';
import LanguagueSwithcer from 'src/components/LanguageSelector';

const MAX_NAVBAR_MARGIN = 240;
const MIN_NAVBAR_MARGIN = 64;

const BodyComponent: React.FC<BodyComponentProps> = ({ isExpandedNavBar }) => {
  return (
    <div
      className="BodyComponent"
      style={{
        marginLeft: isExpandedNavBar ? MAX_NAVBAR_MARGIN : MIN_NAVBAR_MARGIN,
      }}
    >
      <LanguagueSwithcer />
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
    <div className="Routes">
      <BrowserRouter>
        <Route
          render={({ history }) => (
            <NavBar history={history} navBarTitle={'GAVPLA'} />
          )}
        />
        <BodyComponent isExpandedNavBar={isExpandedNavBar} />
      </BrowserRouter>
    </div>
  );
};

export default Routes;
