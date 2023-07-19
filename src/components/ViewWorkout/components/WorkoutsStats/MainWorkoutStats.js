import React from 'react'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import { configMainStats } from '@constants/stats.constant'

const MainWorkoutStats = ({ data, styles }) => {
  const order = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate', 'avgPower']

  const block = order.map((item, index) => {
    if (data[item]) {
      const value = data.k > 1 && configMainStats[item]?.uniqueFormatter
        ? configMainStats[item]?.uniqueFormatter(data[item])
        : configMainStats[item]?.formatter
          ? configMainStats[item]?.formatter(data[item])
          : data[item]
      const unit = data.k > 1 && configMainStats[item]?.uniqueUnit
        ? dictConstant.units[configMainStats[item].uniqueUnit][userLang]
        : configMainStats[item].unit
          ? dictConstant.units[configMainStats[item].unit][userLang]
          : ''
      return (<div key={index}>
        <span className={styles.mainStatsUnit}>
          {value + ' ' + unit}
        </span>
          <span className={styles.mainStatsLabel}>
          {data.k > 1 && configMainStats[item].uniqueLabel
            ? dictConstant.fields[configMainStats[item].uniqueLabel][userLang]
            : dictConstant.fields[configMainStats[item].label][userLang]}
        </span>
        </div>)
    } else return null
  }
  )

  return (
    <div className={styles.mainStats}>
      {block}
    </div>
  )
}

export default React.memo(MainWorkoutStats)
