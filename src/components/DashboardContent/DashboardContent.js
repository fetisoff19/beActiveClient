import React, {useRef, useState} from 'react';
import StartStats from "./Stats/StartStats.js";
import Workout from "./Workouts/Workout.js";
import useScroll from "../../hooks/useScroll";
import styles from './styles.module.scss';
import AppLoader from "../Loaders/AppLoader";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getWorkouts} from "../../store/workouts/workouts.actions.js";
import ThreeDotsLoader from "../Loaders/ThreeDotsLoader";

const DashboardContent = () => {
  const loader = useSelector(state => state.app.appLoader);
  const workouts = useSelector(state => state.workouts.workouts);
  const limit = 8;
  const dispatch = useDispatch();
  const parentRef = useRef();
  const childRef = useRef();
  const [page, setPage] = useState(1)
  const numberOfFiles = useSelector(state => state.workouts.numberOfFiles);
  const workoutsLength = useSelector(state => state.workouts.workouts?.length);
  const request = useSelector(state => state.app.requestGetWorkouts)
  const stopObserved = workoutsLength === +numberOfFiles;

  useScroll(parentRef, childRef, stopObserved, 1500, checkNextPage);

  function checkNextPage(){
    if(!stopObserved && !loader && !request){
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    dispatch(getWorkouts('all', 'timestamp', -1, page, limit))
  }, [page, limit])

  let list = workouts?.map(item =>
    <Workout key={item._id} data={item}/>);

  let smallLoader = loader && page > 1
    && <ThreeDotsLoader className={styles.smallLoader}/>


  return (
    <div ref={parentRef} className={styles.page}>
      {loader && page === 1
        ? <AppLoader cursorWait={true}/>
          : (<div className={styles.container}>
              <div>
                <div className={styles.stats}>
                  <StartStats/>
                </div>
              </div>
              <div className={styles.workouts}>
                {list}
                {smallLoader}
              </div>
            </div>)
      }
      <div ref={childRef} className={'childRef'}/>
    </div>
  );
};

export default DashboardContent;