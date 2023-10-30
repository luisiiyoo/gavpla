import React from 'react';
import { ErrorDisplayProps } from './ErrorDisplay.types';
import './ErrorDisplay.css';
import { HTTP_STATUS_CODES } from 'src/utils/constants';

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, statusCode }) => {
  const statusCodeStr = statusCode || '';
  const statusCodeName = HTTP_STATUS_CODES[statusCodeStr] || '';
  return (
    <div className="Error">
      <div className="Error-Label" data-testid="ErrorLabel">
        <span> {`Error ${statusCodeStr} ${statusCodeName}`} </span>
      </div>
      <div className="Error-Message" data-testid="ErrorMessage">
        {message}
      </div>
    </div>
  );
};

export default ErrorDisplay;
