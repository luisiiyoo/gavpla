import React from 'react';
import './PageNotFound.css';
import ErrorDisplay from '../ErrorDisplay';

const PageNotFound: React.FC = () => (
  <div className="PageNotFound" data-testid="PageNotFound">
    <ErrorDisplay message={`Page not found`} statusCode={404} />
  </div>
);

export default PageNotFound;
