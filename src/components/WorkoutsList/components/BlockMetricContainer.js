import React from 'react'

import { dictConstant, userLang } from '@constants/dict.constant.js'
import styles from '../styles.modules.scss'
import { configMainStats } from '@constants/stats.constant'

const baseOrder = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate']
const cyclingOrder = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgPower']

const BlockMetricContainer = ({ data }) => {
  const block = baseOrder.map((item, index) => {
    const value = data.k > 1 && configMainStats[item]?.uniqueFormatter && data[item]
      ? configMainStats[item]?.uniqueFormatter(data[item])
      : configMainStats[item]?.formatter && data[item]
        ? configMainStats[item]?.formatter(data[item])
        : data[item]

    return (
      <div key={index} className={styles.mBlock}>
        <span className={styles.unit}>
          {value && data.k > 1 && configMainStats[item]?.uniqueUnit
            ? (value + ' ' +
              (configMainStats[item]?.uniqueUnit
                ? dictConstant.units[configMainStats[item]?.uniqueUnit][userLang]
                : ''))
            : value
              ? (value + ' ' +
                (configMainStats[item]?.unit
                  ? dictConstant.units[configMainStats[item].unit][userLang]
                  : ''))
              : '--'}
        </span>
        <span className={styles.label}>
          {data.k > 1 && configMainStats[item]?.uniqueLabel
            ? dictConstant.fields[configMainStats[item].uniqueLabel][userLang]
            : dictConstant.fields[configMainStats[item].label][userLang]}
        </span>
      </div>
    )
  })

  return (
    <div className={styles.blockMetricContainer}>
      {block}
    </div>
  )
}

export default BlockMetricContainer
