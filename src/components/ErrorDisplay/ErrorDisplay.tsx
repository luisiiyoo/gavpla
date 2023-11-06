import React from 'react';
import { ErrorDisplayProps } from './ErrorDisplay.types';
import './ErrorDisplay.css';
import { HTTP_STATUS_CODES } from 'src/utils/constants';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { getTranslation } from 'src/language';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, statusCode }) => {
  const history = useHistory();
  const statusCodeStr = statusCode || '';
  const statusCodeName = HTTP_STATUS_CODES[statusCodeStr] || '';

  const { languageCode }: StateType = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'Error');

  const isClientError: boolean = statusCode !== undefined && statusCode < 500;
  const buttonText = isClientError
    ? translation['ReturnToHome']
    : translation['RefreshPage'];
  const handleReturnToHome = () => {
    if (isClientError) {
      history.push('/');
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="Error">
      <div className="Error-Label" data-testid="ErrorLabel">
        <span>
          {' '}
          <i className="fa-solid fa-triangle-exclamation"></i>{' '}
          {`Error ${statusCodeStr} - ${statusCodeName}`}{' '}
        </span>
      </div>
      <div className="Error-Message" data-testid="ErrorMessage">
        {message}
      </div>

      <Button className={`ErrorButton`} onClick={handleReturnToHome}>
        {buttonText}
      </Button>
    </div>
  );
};

export default ErrorDisplay;
