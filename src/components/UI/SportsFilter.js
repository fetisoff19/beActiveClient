import React from 'react';
import {dict, userLang} from "@constants/config";
import SportsIcon from "./SportsIcon.js";
import {useMemo} from "react";
import {useSelector} from "react-redux";

const SportsFilter = ({sport, onClick, styles}) => {
  const stats = useSelector(state => state.workouts.stats);

  const sports = useMemo(() => {
    let sports = []
    for (let sport in stats?.sports){
      if(stats.sports[sport])
        sports.push(sport)
    }
    sports.sort((a, b) => stats.sports[b] - stats.sports[a])
    return ['all', ...sports]
  }, [stats]);


  function checkSport(item){
    if(item === sport) return true
    else return !sports.includes(sport) && item === 'all';
  }

  return (
    <div className={styles.sportsFilter}>
      {sports.map(item =>
        <div className={checkSport(item) ? styles?.check : ''}
          onClick={() => onClick(item)}
          key={item}>
          {item === 'all'
            ? dict.title.all[userLang]
            : <SportsIcon
              className={checkSport(item) ? 'icon active' : 'icon'}
              sport={item}/>}
        </div>)}
    </div>
  );
};

export default SportsFilter;