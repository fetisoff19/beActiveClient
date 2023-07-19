import React from 'react'
import { useSelector } from 'react-redux'
import { WorkoutsList } from '@components/WorkoutsList/WorkoutsList'
import NoWorkouts from '@components/NoWorkouts/NoWorkouts'

const Workouts = () => {
  const stats = useSelector(state => state.workouts.stats)

  return (
    <>
      {stats?.allTime?.totalWorkouts === 0 &&
        <NoWorkouts/>}
      <WorkoutsList/>
    </>
  )
}

export default Workouts
