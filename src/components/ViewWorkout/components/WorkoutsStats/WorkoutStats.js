import React from 'react';
import {dictConstant, userLang} from "@constants/dict.constant.js";
import {statsFields} from "@constants/stats.constant";

const WorkoutStats = ({data, styles}) => {

let order =
  data.k > 1
    ?  ['heartRate', 'cadenceRun', 'pace', 'altitude', 'temperature', 'time', 'other']
    : data.sport === 'cycling'
      ? ['heartRate', 'cadence', 'power', 'speed', 'altitude', 'temperature', 'time', 'other']
      : ['heartRate', 'speed', 'altitude', 'temperature', 'time', 'other'];

  let stats = [];

  for (let unit of order) {
    let fields = statsFields[unit].fields.map(item =>
      data[item] &&
      (<div className={styles.statsBlock} key={item}>
        <div className={styles.statsUnit}>
          {(statsFields[unit]?.formatter ? statsFields[unit].formatter(data[item]) : data[item])
          + ' ' +
          (statsFields[unit].unit ? dictConstant.units[statsFields[unit].unit][userLang] : '')}
        </div>
        <div className={styles.statsLabel}>{dictConstant.fields[item][userLang]}</div>
      </div>)
    )
    let block = fields.filter(a => a !== null).length
      ? (<div key={unit}>
        <div className={styles.statsMainLabel}>
          {dictConstant.fields[unit][userLang]}
        </div>
        {fields}
          </div>)
      : null;
    stats.push(block)
  }

  return (
    <div className={styles.stats}>
      {stats}
    </div>
  );
};

export default React.memo(WorkoutStats);