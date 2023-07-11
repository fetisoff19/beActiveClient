import React from 'react';
import {WorkoutsList} from "../components/WorkoutsList/WorkoutsList.js";
import {useSelector} from "react-redux";
import NoWorkouts from "../components/NoWorkouts/NoWorkouts";

const Workouts = () => {
  const stats = useSelector(state => state.workouts.stats);

  return (
    <>
      {stats?.allTime?.totalWorkouts === 0
        && <NoWorkouts/>}
      <WorkoutsList/>
    </>
  );
};

export default Workouts;