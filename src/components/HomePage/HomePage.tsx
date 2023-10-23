import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import GAVPLA from 'src/images/GAVPLA.png';
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

        <div className="HomePage-Logo">
          <img src={GAVPLA} />
        </div>

        <br />
        <p>{translation['body']['p1']}</p>
        <br />
        <p>{translation['body']['p2']}</p>
        <br />

        <div className="Author">
          <h3>{translation['body']['author']}</h3>
          {/* <ul>
          <li> */}
          Luis González Guzmán &nbsp;
          <a
            className="AuthorLink"
            href="https://www.linkedin.com/in/luis-gonz%C3%A1lez-guzm%C3%A1n-2b464b139/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin" />
          </a>
          &nbsp;
          <a
            className="AuthorLink"
            href="mailto:luis.gonzalez.guzman.93@gmail.com"
          >
            <i className="fa-solid fa-envelope" />
          </a>
          &nbsp;
          <a
            className="AuthorLink"
            href="https://www.facebook.com/LuiSiiYoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-square-facebook" />
          </a>
          {/* </li>
        </ul> */}
        </div>
      </>
    </div>
  );
};

export default HomePage;
