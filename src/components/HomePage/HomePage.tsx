import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import GAVPLA from 'src/images/GAVPLA.png';
import { ReactComponent as PostgresLogo } from 'src/images/postgresql.svg';
import BulbChannelSign from 'src/components/BulbChannelSign';
import './HomePage.css';

const HomePage: React.FC = () => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(languageCode, 'HomePage');

  return (
    <div className="HomePage" style={{}}>
      <>
        <h2 className="HomePage-visuallyHidden">{translation['title']}</h2>

        <div className="HomePage-BulbChannel">
          <BulbChannelSign
            brandText='GAVPLA'
            subtitle="Galería Virtual de Placas Antiguas"
          />
        </div>

        <div className="HomePage-Logo">
          <img src={GAVPLA} alt={translation['title']} />
        </div>

        <br />
        <br />
        <p>{translation['body']['p1']}</p>
        <p>{translation['body']['p2']}</p>
        <br />

        <section className="Author" aria-labelledby="home-author-heading">
          <h3 id="home-author-heading">{translation['body']['author']}</h3>
          <p className="Author-name">{translation['body']['authorName']}</p>
          <p className="Author-bio">{translation['body']['authorBio']}</p>
          <div className="Author-social">
            <a
              className="AuthorLink"
              href="https://www.linkedin.com/in/luis-gonz%C3%A1lez-guzm%C3%A1n-2b464b139/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin" aria-hidden />
            </a>
            <a
              className="AuthorLink"
              href="mailto:luis.gonzalez.guzman.93@gmail.com"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope" aria-hidden />
            </a>
            <a
              className="AuthorLink"
              href="https://www.facebook.com/profile.php?id=61552860777968"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-square-facebook" aria-hidden />
            </a>
          </div>
        </section>

        <section className="HomeStack" aria-labelledby="home-stack-heading">
          <h3 id="home-stack-heading">{translation['body']['stackIntro']}</h3>
          <div
            className="HomeStack-icons"
            role="img"
            aria-label={translation['body']['stackTechAria']}
          >
            <span className="HomeStack-icon HomeStack-icon--python" title="Python">
              <i className="fa-brands fa-python" aria-hidden />
            </span>
            <span className="HomeStack-icon HomeStack-icon--react" title="React">
              <i className="fa-brands fa-react" aria-hidden />
            </span>
            <span
              className="HomeStack-icon HomeStack-icon--postgres"
              title="PostgreSQL"
            >
              <PostgresLogo className="HomeStack-svgLogo" aria-hidden />
            </span>
            <span
              className="HomeStack-icon HomeStack-icon--gcp"
              title="Google Cloud Platform"
            >
              <i className="fa-brands fa-google" aria-hidden />
            </span>
            <span className="HomeStack-icon HomeStack-icon--docker" title="Docker">
              <i className="fa-brands fa-docker" aria-hidden />
            </span>
          </div>
        </section>
      </>
    </div>
  );
};

export default HomePage;
