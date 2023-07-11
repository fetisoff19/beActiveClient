import React, {useState} from 'react';
import styles from "../styles.module.scss";
import {dict, userLang} from "../../../config/config";

const indicators = [ 'totalWorkouts', 'totalTimerTime', 'totalDistance', 'avgHeartRate', 'avgSpeed', 'enhancedAvgSpeed', 'avgPower', 'maxHeartRate',  'totalAscent',  'avgCadence', 'totalCalories']

const IndicatorsList = ({field, setField}) => {

  function handleClick(item) {
    setField(item)
  }

  const list = indicators.map(item =>
    <li
      key={item}
      onClick={() => handleClick(item)}
      className={field === item ? styles.selected : ''}
    >
      {dict.fields[item][userLang]}
    </li>)

  return (
    <div className={styles.indicators}>
      <ul>
        {list}
      </ul>
    </div>
  );
};

export default IndicatorsList;