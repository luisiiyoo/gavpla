import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import './HomePage.css';

const HomePage: React.FC = () => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(languageCode, 'HomePage');

  return (
    <div className="HomePage" style={{}}>
      <>
        <h2>{translation['title']}</h2>

        {/* <img src = "https://drive.google.com/uc?id=1FfkogwDPmTI58dVYAJ6bhiysCFJqYLcq&export=download" width="200" height="128"/> */}
        <br />
        <br />
        <p>{translation['body']['p1']}</p>
        <br />
        <p>{translation['body']['p2']}</p>
        <br />
        <br />

        <h3>{translation['body']['author']}</h3>
        <ul style={{ listStyleType: 'none' }}>
          <li>Luis González Guzmán</li>
          <li>
            <span className="AuthorEmail">
              luis.gonzalez.guzman.93@gmail.com
            </span>
          </li>
        </ul>
      </>
    </div>
  );
};

export default HomePage;
