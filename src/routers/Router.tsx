import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {
  RouterProps,
  MainComponentProps as BodyComponentProps,
} from './Router.types';
import { navigationFCItems } from './routes';
import PageNotFound from '../components/PageNotFound';
import NavBar from '../components/NavBar';
import './Router.css';
import LanguagueSwithcer from 'src/components/LanguageSelector';

const BodyComponent: React.FC<BodyComponentProps> = ({ isExpandedNavBar }) => {
  return (
    <div
      className={`BodyComponent ${
        isExpandedNavBar ? 'BodyComponent--expanded' : 'BodyComponent--collapsed'
      }`}
    >
      <LanguagueSwithcer />
      <div className="BodyContent">
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
    </div>
  );
};

const Routes: React.FC<RouterProps> = () => {
  const { main } = useSelector((state) => state);
  const { expand: isExpandedNavBar } = main;

  return (
    <div className="Routes">
      <HashRouter>
        <Route
          render={({ history }) => (
            <NavBar history={history} navBarTitle={'GAVPLA'} />
          )}
        />
        <BodyComponent isExpandedNavBar={isExpandedNavBar} />
      </HashRouter>
    </div>
  );
};

export default Routes;
