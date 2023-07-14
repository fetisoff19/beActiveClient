import React from 'react';
import {dict, userLang} from "../utils/constants/config.js";
import {Link} from "react-router-dom";

const PageNotFound = () => {

  return (
    <div className={'page'}>
      <div className={'content error'}>
        <h1>{dict.title.pageNotFound[userLang]}</h1>
        <Link to={'/'}>{dict.title.goToDashboard[userLang]}</Link>
      </div>
    </div>

  )
};

export default PageNotFound;