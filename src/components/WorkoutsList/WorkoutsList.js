import React, {useEffect, useState} from 'react';
import styles from './styles.modules.scss'
import {useDispatch, useSelector} from "react-redux";
import AppLoader from "../Loaders/AppLoader";
import Workouts from "./Components/Workouts";
import {getWorkouts} from "../../redux/actions/workouts";
import useScroll from "../../hooks/useScroll";
import {useRef} from "react";
import FilterBarTitle from "./Components/FilterBarTitle.js";
import WorkoutsListContext from "./context/Context";
import ModalTransparent from "../UI/ModalTransparent.js";

export function WorkoutsList() {
  const [chosenField, setChosenField] = useState('timestamp')
  const [sport, setSport] = useState('all')
  const [search, setSearch] = useState('')
  const [firstLoad, setFirstLoad] = useState(false)

  const [direction, setDirection] = useState(-1)
  const [page, setPage] = useState(1)
  const limit = 30;
  const numberOfFiles = useSelector(state => state.workouts.numberOfFiles);
  const workoutsLength = useSelector(state => state.workouts.workouts?.length);
  const stats = useSelector(state => state.workouts.stats);
  const loader = useSelector(state => state.app.appLoader);
  const request = useSelector(state => state.app.requestGetWorkouts);

  const parentRef = useRef();
  const childRef = useRef();
  const dispatch = useDispatch();

  const stopObserved = (workoutsLength === +numberOfFiles);

  function checkNextPage(){
    if(!stopObserved && !loader && !request){
      setPage(prev => prev + 1)
    }
  }

  const modal = (loader && page === 1 && stats?.allTime?.totalWorkouts > 0)
    && <ModalTransparent/>

  const showLoader = loader && page === 1 && +numberOfFiles === 0 && !firstLoad;


  useScroll(parentRef, childRef, stopObserved, 1500, checkNextPage);

  useEffect(() => {
    dispatch(getWorkouts(sport, chosenField, direction, page, limit, search))
  }, [sport, chosenField, direction, page, limit, search])

  useEffect(() => setFirstLoad(true),[]);


  return (
    <WorkoutsListContext.Provider value={{
      sport, setSport, setPage,
      direction, setDirection,
      chosenField, setChosenField,
      search, setSearch
    }}>
      {modal}
      <div className={styles.container} ref={parentRef}>
        {showLoader
          ? <AppLoader cursorWait={true}/>
            : <FilterBarTitle/>}
        <div className={styles.down}>
          <ul>
            <Workouts page={page} search={search}/>
          </ul>
          <div ref={childRef} className={'childRef'}/>
        </div>
      </div>
    </WorkoutsListContext.Provider>
  )
}
