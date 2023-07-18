import React from 'react';
import {dictConstant, userLang} from "@constants/dict.constant.js";

const About = () => {
  return (
    <div className='about'>
      <div>
        <h1>
          {dictConstant.title.about[userLang]}
        </h1>
        <p>
          {dictConstant.title.aboutApp1[userLang]}
          <a href='https://drive.google.com/drive/folders/1NCrcDjoPpgEUH09G-hz3cVeMb9vs1rhc?usp=drive_link'>
            {dictConstant.title.link[userLang] + '.'}
          </a>
          {dictConstant.title.aboutApp2[userLang]}
          <br/>
          {dictConstant.title.repo[userLang]}
          <a href='https://github.com/fetisoff19/beActiveClient'>github.com/fetisoff19/beActiveClient</a>
          <br/><br/>
          {dictConstant.title.photo[userLang]}
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