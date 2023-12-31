import React from 'react'
import styles from '../styles.module.scss'
import { convertDistance, getHourMinSec } from '../../../utils/helpers/functionsDate&Values.helpers.js'
import { dictConstant, userLang } from '@constants/dict.constant.js'

const Indicators = ({ data }) => {
  const fields = {
    totalDistance: {
      formatter: x => convertDistance(x).toString().replace('.', ','),
      unit: 'km'
    },
    totalTimerTime: {
      formatter: getHourMinSec,
      unit: null
    },
    totalAscent: {
      formatter: x => x,
      unit: 'm'
    },
    avgHeartRate: {
      formatter: x => x,
      unit: 'bpm'
    },
    totalCalories: {
      formatter: x => x,
      unit: null
    }
  }
  const block = [];
  ['totalDistance', 'totalTimerTime', 'totalAscent', 'avgHeartRate', 'totalCalories']
    .forEach(item => {
      if (data[item] && block.length < 3) {
        block.push(
          <div key={item} className={styles.indicator}>
            <div className={styles.unit}>
              {fields[item].formatter(data[item]) + ' ' +
                (fields[item].unit ? dictConstant.units[fields[item].unit][userLang] : '')}
            </div>
            <div className={styles.label}>
              {dictConstant.fields[item][userLang]}
            </div>
          </div>
        )
      }
    })

  return (
    <div className={styles.indicators}>
      {block}
    </div>
  )
}

export default React.memo(Indicators)
