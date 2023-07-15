import React from 'react';
import {dictConstant, userLang} from "@constants/dict.constant.js";

const SportAndDate = ({data, className}) => {
  return (
    <div className={className}>
        {(dictConstant.sports.hasOwnProperty(data.sport)
            ? dictConstant.sports[data.sport][userLang]
            : dictConstant.sports.other[userLang]) + ', '
          + (new Date(data.timestamp).toLocaleString() || '')}
    </div>
  );
};

export default React.memo(SportAndDate);