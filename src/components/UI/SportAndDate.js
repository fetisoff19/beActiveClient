import React from 'react';
import {dict, userLang} from "@constants/config";

const SportAndDate = ({data, className}) => {
  return (
    <div className={className}>
        {(dict.sports.hasOwnProperty(data.sport)
            ? dict.sports[data.sport][userLang]
            : dict.sports.other[userLang]) + ', '
          + (new Date(data.timestamp).toLocaleString() || '')}
    </div>
  );
};

export default React.memo(SportAndDate);