import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import GAVPLA from 'src/images/GAVPLA.png';
import './HomePage.css';

const HomePage: React.FC = () => {
  const {
    main: { languageCode },
  } = useSelector((state) => state);
  const translation = getTranslation(languageCode, 'HomePage');

  useEffect(() => {
    // Add your script here
    const script = document.createElement('script');
    script.src =
      '//rf.revolvermaps.com/0/0/6.js?i=5ebatgszveu&amp;m=7&amp;c=e63100&amp;cr1=ffffff&amp;f=arial&amp;l=0&amp;bv=90&amp;lx=-420&amp;ly=420&amp;hi=20&amp;he=7&amp;hc=a8ddff&amp;rs=80'; //'//rf.revolvermaps.com/0/0/8.js?i=5wm*****1mh&m=0&c=ff0000&cr1=ffffff&f=arial&l=33';
    script.async = true;
    // Load the script inside the specific div with the id "mapContainer"
    const mapContainer = document.getElementById('mapContainer');
    console.log('ey');
    if (mapContainer) {
      mapContainer.appendChild(script);
    }
    return () => {
      // Remove the script when the component unmounts
      if (mapContainer && mapContainer.contains(script)) {
        mapContainer.removeChild(script);
      }
    };
  }, []);
  return (
    <div className="HomePage" style={{}}>
      <>
        <h2>{translation['title']}</h2>

        <div className="HomePage-Logo">
          <img src={GAVPLA} alt="GAVPLA" />
        </div>

        <br />
        <p>{translation['body']['p1']}</p>

        <div id="mapContainer">
          {/* The globe script will be loaded inside this div */}
        </div>
        <br />
        <p>{translation['body']['p2']}</p>
        <br />

        <div className="Author">
          <h3>{translation['body']['author']}</h3>
          {/* <ul>
          <li> */}
          Luis González Guzmán
          <br />
          &nbsp; &nbsp;
          <a
            className="AuthorLink"
            href="https://www.linkedin.com/in/luis-gonz%C3%A1lez-guzm%C3%A1n-2b464b139/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin" />
          </a>
          &nbsp; &nbsp;
          <a
            className="AuthorLink"
            href="mailto:luis.gonzalez.guzman.93@gmail.com"
          >
            <i className="fa-solid fa-envelope" />
          </a>
          &nbsp; &nbsp;
          <a
            className="AuthorLink"
            href="https://www.facebook.com/profile.php?id=61552860777968"
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
