import React, { useEffect, useState } from 'react';
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

const BACKGROUND_SCENES = [
  '/assets/mx-garage-wall-morning.png',
  '/assets/mx-garage-wall-afternoon.png',
  '/assets/mx-garage-wall-night.png',
];
const BACKGROUND_SCENE_INTERVAL_MS = 10000;
const BACKGROUND_TRANSITION_MS = 1800;

const BodyComponent: React.FC<BodyComponentProps> = ({ isExpandedNavBar }) => {
  const [backgroundSceneIndex, setBackgroundSceneIndex] = useState(0);
  const [nextBackgroundSceneIndex, setNextBackgroundSceneIndex] = useState<
    number | null
  >(null);
  const [isBackgroundTransitioning, setIsBackgroundTransitioning] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (isBackgroundTransitioning) return;
      const nextIndex = (backgroundSceneIndex + 1) % BACKGROUND_SCENES.length;
      setNextBackgroundSceneIndex(nextIndex);
      setIsBackgroundTransitioning(true);
    }, BACKGROUND_SCENE_INTERVAL_MS);
    return () => {
      clearInterval(intervalID);
    };
  }, [backgroundSceneIndex, isBackgroundTransitioning]);

  useEffect(() => {
    if (!isBackgroundTransitioning || nextBackgroundSceneIndex === null) return;

    const timeoutID = setTimeout(() => {
      setBackgroundSceneIndex(nextBackgroundSceneIndex);
      setNextBackgroundSceneIndex(null);
      setIsBackgroundTransitioning(false);
    }, BACKGROUND_TRANSITION_MS);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [isBackgroundTransitioning, nextBackgroundSceneIndex]);

  return (
    <div
      className={`BodyComponent ${
        isExpandedNavBar ? 'BodyComponent--expanded' : 'BodyComponent--collapsed'
      }`}
    >
      <div
        className="BodyBackgroundLayer BodyBackgroundLayer--current"
        style={{
          backgroundImage: `url(${BACKGROUND_SCENES[backgroundSceneIndex]})`,
        }}
      />
      {nextBackgroundSceneIndex !== null && (
        <div
          className={`BodyBackgroundLayer BodyBackgroundLayer--next ${
            isBackgroundTransitioning ? 'is-visible' : ''
          }`}
          style={{
            backgroundImage: `url(${BACKGROUND_SCENES[nextBackgroundSceneIndex]})`,
          }}
        />
      )}
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
