import React from 'react';
import styles from "../styles.modules.scss";
import {dict, userLang} from "../../../config/config";
import FilterBar from "./FilterBar";
import Titles from "./Titles";
import {useSelector} from "react-redux";
import ModalNotice from "../../UI/ModalNotice";

const FilterBarTitle = () => {
  const stats = useSelector(state => state.workouts.stats);
  const modal = useSelector(state => state.app.modal);


  return (
    <div className={styles.up}>
      {modal &&
        <ModalNotice
          text={dict.title.notAvailableInDemoMode[userLang]}
          className={'modalNotice '}/>}
      {stats?.allTime?.totalWorkouts > 0 &&
        <>
          <h1>
            {dict.title.activities[userLang]}
          </h1>
          <FilterBar/>
          <Titles/>
        </>
        }
    </div>
  );
};

export default FilterBarTitle;