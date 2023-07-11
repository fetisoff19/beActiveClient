import React, {useCallback, useEffect, useState} from 'react';
import {dict, userLang} from "../../../config/config.js";
import Block from "./Block";
import {convertDistance, convertPace, convertSpeed, getHourMinSec} from "../../../API/functionsDate&Values";
import {useSelector} from "react-redux";
import styles from "../styles.module.scss";



const config = {
  sections: ['allTime', 'cycling', 'running',
    'other', 'hiking', 'walking',
  ],
  allTime:  ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'totalAscent', 'totalDescent'],
  cycling:  ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'totalAscent', 'totalDescent', 'avgPower', 'avgSpeed', 'avgHeartRate', 'avgCadence'],
  running:  ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'totalAscent', 'totalDescent', 'avgPace', 'avgHeartRate', 'avgRunningCadence'],
  walking:  ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'totalAscent', 'totalDescent', 'avgPace', 'avgHeartRate',],
  hiking:  ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'totalAscent', 'totalDescent', 'avgPace', 'avgHeartRate',],
  other:  ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'totalAscent', 'totalDescent' , 'avgPace', 'avgHeartRate',],
  fields: {
    totalTimerTime: {
      formatter: getHourMinSec,
    },
    totalDistance: {
      unit: 'km',
      formatter: convertDistance,
    },
    totalAscent: {
      unit: 'm',
      formatter: Math.round,
    },
    totalDescent: {
      unit: 'm',
      formatter: Math.round,
    },
    avgHeartRate: {
      unit: 'bpm',
      formatter: function ([hr, t]){
        return Math.round(hr/t)
      },
    },
    avgSpeed: {
      unit: 'kmph',
      formatter: function ([v, t]){
        return convertSpeed(v/t)
      },
    },
    avgPace: {
      unit: 'pace',
      formatter: function ([p, t]){
        return convertPace(p/t)
      }
    },
    avgCadence: {
      unit: 'cadenceCycling',
      formatter: function ([c, t]){
        return Math.round(c/t)
      }
    },
    avgRunningCadence: {
    unit: 'cadenceRun',
    formatter: function ([c, t]){
      return Math.round(c/t)
    }
  },
    avgPower :{
      unit: 'w',
      formatter: function ([v, t]){
        return Math.round(v/t)
      }
    },
  }
};

const StartStats = () => {
  const [sport, setSport] = useState('allTime');
  const [sportsArray, setSportsArray] = useState(config.sections);
  const [isOpenList, setIsOpenList] = useState(false);
  const stats = useSelector(state => state.workouts.stats);

  const click = useCallback(e => handleClick(e), [])

  useEffect(() => {
    document.addEventListener('click', click);
    return () =>
      document.removeEventListener('click', click);
  },[])


  const blocks = sport
    ? <Block key={sport} elem={sport} config={config}/>
    : null

  const li = sportsArray.map((item, index) =>
    stats.hasOwnProperty(item) && stats[item].totalWorkouts > 0
      && (index === 0 || isOpenList) &&
        <li key={item} id={item}>
          {dict.sports[item][userLang]}
        </li>)

  function handleClick(e) {
    if(e.target.tagName === 'LI'){
      setIsOpenList(prev => !prev);
      if(e.target.id) {
        setSport(e.target.id)
        setSportsArray(prev => [e.target.id, ...prev.filter(item => item !== e.target.id)])
      }
    } else {
      setIsOpenList(false);
    }
  }


  return (
    <div className={styles.statsContent}>
      <h1>
        {dict.title.stats[userLang]}
      </h1>
      <div className={styles.list}>
        <ul className={isOpenList ? styles.open : null}>
          {li}
        </ul>
      </div>
      <div className={styles.blocks}>
        {blocks}
      </div>
    </div>
  );
};

export default React.memo(StartStats);