import React from 'react';
import {useSelector} from "react-redux";
import {dictConstant, userLang} from "@constants/dict.constant.js";
import styles from "../styles.module.scss";

const Block = ({elem, config}) => {
  const stats = useSelector(state => state.workouts.stats);

  const block = config[elem].map((field, index) => {
    if(stats && stats[elem] && (stats[elem][field] > 0 || (stats[elem][field][0] > 10 && stats[elem][field][1] > 60))) {
      const value = config.fields[field]?.formatter
        ? config.fields[field].formatter(stats[elem][field])
        : stats[elem][field];
      const unit = config.fields[field]?.unit
        ? (' ' + dictConstant.units[config.fields[field].unit][userLang])
        : '';

      return(
        <div key={index} className={styles.block}>
          <span>
            {dictConstant.fields[field][userLang]}
          </span>
          <span>
            {value?.toString().replaceAll('.', ',') + unit}
          </span>
        </div>
      )
    }
  })

  return  (
    <>
      {/*<h3>*/}
      {/*  {dictConstant.sports[elem][userLang]}*/}
      {/*</h3>*/}
      {block}
    </>
  )
};

export default Block;