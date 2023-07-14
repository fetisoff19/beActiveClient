import React from 'react';

import {dict, userLang} from "../config/config";

const About = () => {
  return (
    <div className='about'>
      <div>
        <h1>
          {dict.title.about[userLang]}
        </h1>
        <p>
          {dict.title.aboutApp1[userLang]}
          <a href='https://drive.google.com/drive/folders/1NCrcDjoPpgEUH09G-hz3cVeMb9vs1rhc?usp=drive_link'>
            {dict.title.link[userLang] + '.'}
          </a>
          {dict.title.aboutApp2[userLang]}
          <br/>
          {dict.title.repo[userLang]}
          <a href='https://github.com/fetisoff19/sports-app'>github.com/fetisoff19/beActiveClient</a>
          <br/><br/>
          {dict.title.photo[userLang]}
          <br/>
          <a href='https://www.pexels.com/photo/black-bicycle-leaning-on-green-wall-3680501/'>Raniery Costa Pelissari</a>
          <br/>
          <a href='https://www.pexels.com/photo/man-riding-bicycle-on-road-6090949/'>lawlesscapture</a>
        </p>
      </div>
    </div>
  );
};

export default About;