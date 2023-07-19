import React from 'react'
import styles from '../styles.module.scss'
import { dictConstant, userLang } from '@constants/dict.constant.js'

const indicators = ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'avgHeartRate', 'avgSpeed', 'enhancedAvgSpeed', 'avgPower', 'maxHeartRate', 'totalAscent', 'avgCadence', 'totalCalories']

const IndicatorsList = ({ field, setField }) => {
  function handleClick (item) {
    setField(item)
  }

  const list = indicators.map(item =>
    <li
      key={item}
      onClick={() => handleClick(item)}
      className={field === item ? styles.selected : ''}
    >
      {dictConstant.fields[item][userLang]}
    </li>)

  return (
    <div className={styles.indicators}>
      <ul>
        {list}
      </ul>
    </div>
  )
}

export default IndicatorsList
