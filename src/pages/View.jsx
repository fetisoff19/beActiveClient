import React, {useEffect} from 'react';
import ViewWorkout from "@components/ViewWorkout/ViewWorkout";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PageNotFound from "./PageNotFound";
import Error from "./Error";
import {getChartsData, getWorkouts, getPolyline, getPowerCurve} from "@store/workouts/workouts.actions";
import AppLoader from "@components/Loaders/AppLoader";
import NoWorkouts from "@components/NoWorkouts/NoWorkouts";
import {cursorWaitOff, hideLoader, showLoader} from "@store/appEvents/appEvents.slice";

const View = () => {
  // компонент отвечает за получение и передачу данных в ViewWorkout
  const params = useParams();
  const _id = params.id;
  const dispatch = useDispatch()
  const error = useSelector(state => state.app.error)
  const loader = useSelector(state => state.app.appLoader)

  const allWorkouts = useSelector(state => state.workouts.allWorkouts)
  const workoutIds = allWorkouts.find(item => item[0] === _id)

  const workout = useSelector(state =>
    state?.workouts?.workouts?.find(workout => workout?._id === _id))

  const chartsData = useSelector(state => state.workouts.chartsData)
    .find(item => item._id === workout?.chartsData)

  const polyline = useSelector(state => state.workouts.polylines)
    .find(item => item._id === workout?.polyline)

  const powerCurve = useSelector(state => state.workouts.powerCurve)
    .find(item => item._id === workout?.powerCurve)


  useEffect(() => {
    if (workoutIds) {
      !workout &&
        dispatch(getWorkouts(null, null, null, 1, 21, null, workoutIds[0]))
      !chartsData && workoutIds[3] && dispatch(getChartsData(workoutIds[3]));
      !polyline && workoutIds[4] && dispatch(getPolyline(workoutIds[4]));
      !powerCurve && workoutIds[5] && dispatch(getPowerCurve(workoutIds[5]));
    }

    if(workout && !loader) {
      dispatch(showLoader())
      setTimeout(() => dispatch(hideLoader()), 200)
    }

    return () => dispatch(cursorWaitOff())
  },[workoutIds, _id])


  return (
    <div className='page'>
      {
        error
          ? <Error error={error}/>
          : loader
            ? <AppLoader cursorWait={true}/>
            : workout
              ? <ViewWorkout
                workout={workout}
                chartsData={chartsData}
                polyline={polyline}
                powerCurve={powerCurve}
              />
              : !allWorkouts.length
                ? <NoWorkouts/>
                : <PageNotFound/>
      }
    </div>
  )
};

export default View;