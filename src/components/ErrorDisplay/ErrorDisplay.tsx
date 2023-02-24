import React from 'react';
import { ErrorDisplayProps } from './ErrorDisplay.types';
import './ErrorDisplay.css';

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, statusCode }) => {
  const statusCodeStr = statusCode || '';
  return (
    <div className="Error">
      <div className="Error-Label" data-testid="ErrorLabel">
        <span> {`Error ${statusCodeStr}`} </span>
      </div>
      <div className="Error-Message" data-testid="ErrorMessage">
        {message}
      </div>
    </div>
  );
};

export default ErrorDisplay;
