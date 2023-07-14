import React from 'react';
import {dict, userLang} from "@constants/config";
import Body from "../../UI/svgComponents/Body";

const WorkoutsNotFound = ({styles}) => {
  return (
    <div className={styles.notFound}>
      <Body/>
      <h3>
        {dict.title.notFound[userLang]}
      </h3>
    </div>
  );
};

export default WorkoutsNotFound;