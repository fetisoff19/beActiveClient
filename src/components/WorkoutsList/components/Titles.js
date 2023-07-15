import React, {useEffect} from 'react';
import styles from "../styles.modules.scss";
import {dictConstant, userLang} from "@constants/dict.constant.js";
import Delete from "../../UI/svgComponents/Delete";
import Other from "../../UI/svgComponents/Sports/sportsIcons/Other.js";
import {useContext} from "react";
import WorkoutsListContext from "../context/Context";


const Titles = () => {
  const {
    chosenField, setChosenField,
    direction, setDirection,
    setPage,
  } = useContext(WorkoutsListContext);


  const fields = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate'];
  const labels = ['totalDistance', 'totalTimerTime', 'avgSpeed', 'totalAscent', 'avgHeartRate'];

  const up = ' \u25B4 ';
  const down = ' \u25BE ';

  const blockMetric = fields.map((field, index) =>
    <div className={styles.mBlock + ' ' + styles.active}
         onClick={() => handleClick(field)}
         key={field} >
      {dictConstant.fields[labels[index]][userLang]}
      <span className={styles.span}>
        {setMarker(field)}
      </span>
    </div>)

  useEffect(() => {
    setPage(1)
  }, [chosenField, direction])

  function handleClick(field){
    setDirection(prev => prev > 0 ? -1 : 1)
    setChosenField(field)
  }

  function setMarker(field){
   if(chosenField !== field) return ''
   return (chosenField === field && direction < 0) ? down : up
  }

  const marker = setMarker('timestamp');


  return (
    <ul>
      <li className={styles.titles}>
        <div className={styles.icon}/>
        <div onClick={() => handleClick('timestamp')}
             className={styles.sBlock + ' ' + styles.active}>
        <span className={styles.span}>
          {marker}
        </span>
          {dictConstant.fields.date[userLang]}
        </div>
        <div className={styles.lBlock}>
          {dictConstant.title.title[userLang]}
        </div>
        <div className={styles.blockMetricContainer}>
          {blockMetric}
        </div>
        <div className={styles.xsBlock}>
          <Delete fill={'rgba(0,0,0,0)'}/>
        </div>
      </li>
    </ul>
  )
};

export default Titles;