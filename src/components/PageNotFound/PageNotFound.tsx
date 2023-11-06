import React from 'react';
import './PageNotFound.css';
import ErrorDisplay from '../ErrorDisplay';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';

const PageNotFound: React.FC = () => {
  const { languageCode }: StateType = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'Error');
  return (
    <div className="PageNotFound" data-testid="PageNotFound">
      <ErrorDisplay message={translation['PageNotFound']} statusCode={404} />
    </div>
  );
};

export default PageNotFound;
