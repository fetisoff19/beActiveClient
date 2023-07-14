import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getIndex,handleKeyboardDown, getDataForCharts} from "@helpers/viewWorkout.helpers";
import Highcharts from 'highcharts';
import ViewWorkoutContext from './context/Context.js'
import ShiftWorkoutButton from "./components/NextWorkout.js";
import styles from './styles.module.scss'
import ChartsContainer from "./components/ChartsContainer/ChartsContainer.js";
import MapsAndStatsContainer from "./components/MapsAndStatsContainer/MapsAndStatsContainer";
import {useDispatch} from "react-redux";
import {cursorWaitOff, cursorWaitOn} from "@store/appEvents/appEvents.slice";


const ViewWorkout = ({workout, chartsData, polyline, powerCurve}) => {
  const [mouseOnCharts, setMouseOnCharts] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [index, setIndex] = useState(null);
  const [polylinePowerCurve, setPolylinePowerCurve] = useState([]);
  const [chartsIsLoaded, setChartsIsLoaded] = useState(false);
  const [writing, setWriting] = useState(false);
  const dispatch = useDispatch();
  const chartsRef = useRef();

  const dataForCharts = useMemo(() =>
    chartsData?.records && workout?.chartsData
      ? getDataForCharts(chartsData.records, workout)
      : null, [chartsData, workout._id])

  const onKeyDown = useCallback((e) => !writing ?
    handleKeyboardDown(e, setZooming) : null, [writing])
  const mouseMove = useCallback((e) =>
    getIndex(e, setIndex, chartsRef.current), [chartsRef.current])

  useEffect(() => {
    !chartsIsLoaded && workout?.chartsData && dispatch(cursorWaitOn())
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  },  [writing]);

  useEffect(() => {
    if(!chartsIsLoaded) return;
    dispatch(cursorWaitOff())
    chartsRef.current?.addEventListener('mousemove', mouseMove);

    return () => {
      if(chartsIsLoaded) {
        chartsRef.current?.removeEventListener('mousemove', mouseMove);
        while (Highcharts.charts.length > 0) {
          Highcharts.charts.pop();
        }
      }
    }
  }, [chartsIsLoaded]);


  if(workout && (dataForCharts || !workout?.chartsData)) {
    return (
      <ViewWorkoutContext.Provider
        value={{
          index, setIndex,
          dataForCharts, workout,
          powerCurve,
          polylinePowerCurve, setPolylinePowerCurve,
          polyline,
          chartsRef,setWriting,
          zooming, setZooming,
          chartsIsLoaded, setChartsIsLoaded,
          mouseOnCharts, setMouseOnCharts
        }}
      >
        <div className={styles.page}>
          <div className={styles.content}>
            <ShiftWorkoutButton
              styles={styles}
              loaded={chartsData?.records ? chartsIsLoaded : true}
              dir={0} _id={workout._id}/>
            <div className={styles.container}>
              {workout.chartsData
                ? <ChartsContainer/>
                : null}
              <MapsAndStatsContainer/>
            </div>
            <ShiftWorkoutButton
              styles={styles}
              loaded={chartsData?.records ? chartsIsLoaded : true}
              dir={1} _id={workout._id}/>
          </div>
        </div>
      </ViewWorkoutContext.Provider>
    )
  }
};

export default ViewWorkout;