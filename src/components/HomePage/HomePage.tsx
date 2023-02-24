import React from 'react';
import frontConfig from 'src/config/server';
import './HomePage.css';

const HomePage: React.FC = () => (
  <div className="HomePage">
    <h2>{frontConfig.serverName}</h2>
    <h3>Description</h3>
    {/* <h4>Instructions</h4> */}
    <p>
      TBD
    </p>

    <div className="AuthorContainer">
      <h3>Author</h3>
      <ul>
        <li>
          Luis González Guzmán,{' '}
          <span className="AuthorEmail">luis.gonzalez.guzman.93@gmail.com</span>
        </li>
      </ul>
    </div>
  </div>
);

export default HomePage;
