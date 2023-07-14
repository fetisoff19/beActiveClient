import React from 'react';
import styles from './styles.module.scss'
import {dict, userLang} from "../../config/config";
import {useSelector} from "react-redux";
import DateSportsFilter from "./components/DateSportsFilter";
import ModalTransparent from "../UI/ModalTransparent";
import {useEffect, useState} from "react";
import AppLoader from "../Loaders/AppLoader";
import {getDataForInputDate} from "../../AppService/functionsDate&Values";

const StatsContent = () => {
  const [firstLoad, setFirstLoad] = useState(false)
  const allWorkouts = useSelector(state => state.workouts.allWorkouts);
  const firstDate = allWorkouts.length > 0 && getDataForInputDate(allWorkouts.at(-1)[2]);
  const secondDate = allWorkouts.length > 0 && getDataForInputDate(allWorkouts[0][2]);
  const loader = useSelector(state => state.app.appLoader);
  const stats = useSelector(state => state.workouts.stats);

  useEffect(() => setFirstLoad(true),[]);


  const showLoader = loader && !firstLoad
  const modal = (loader && stats?.allTime?.totalWorkouts > 0)
    && <ModalTransparent/>

  return (
    <div className={styles.page}>
      {modal}
      <div className={styles.content}>
        {showLoader
          ? <AppLoader cursorWait={true}/>
          : <>
            <h1>
              {dict.title.stats[userLang]}
            </h1>
            {allWorkouts.length > 0 &&
              <DateSportsFilter
                minDate={firstDate} maxDate={secondDate}
              />
            }
          </>
        }
      </div>
    </div>

  );
};

export default StatsContent;