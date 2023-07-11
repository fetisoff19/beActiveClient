import React from 'react';
import {dict, userLang} from "../../config/config";

const NoWorkouts = () => {
  return (
    <div className={'page'}>
      <div className={'content'}>
        <h1>{dict.title.addActivities[userLang]}</h1>
      </div>
    </div>
  );
};

export default NoWorkouts;