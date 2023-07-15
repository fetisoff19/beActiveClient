import React from 'react';
import WorkoutName from "../../UI/WorkoutName.js";
import SportAndDate from "../../UI/SportAndDate.js";
import styles from '../styles.module.scss'
import SportsIcon from "../../UI/SportsIcon.js";
import TextArea from "../../UI/TextArea.js";
import Map from "./Map.js";
import Indicators from "./Indicators.js";
import variables from '@components/DashboardContent/styles.module.scss'


const Workout = ({data}) => {

  return (
    <div className={styles.workout}>
      <SportsIcon sport={data.sport} fill={variables.appColorGrey} height={'30px'} width={'30px'}/>
      <div className={styles.workoutInfo}>
        <SportAndDate className={styles.date} data={data}/>
        <WorkoutName className={styles.name} data={data}/>
        <Indicators data={data}/>
        <div className={styles.aboutWorkout}>
          <TextArea text={data.note} _id={data._id} styles={styles}/>
        </div>
        {/*Статистика: персональные рекорды...*/}
      </div>
      <Map id={data?.polyline}/>
    </div>
  );
};

export default React.memo(Workout);

