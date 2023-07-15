import React from 'react';
import {dictConstant, userLang} from "@constants/dict.constant.js";

const NoWorkouts = () => {
  return (
    <div className={'page'}>
      <div className={'content'}>
        <h1>{dictConstant.title.addActivities[userLang]}</h1>
      </div>
    </div>
  );
};

export default NoWorkouts;