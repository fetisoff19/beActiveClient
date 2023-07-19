import React from 'react'
import { useSelector } from 'react-redux'
import NoWorkouts from '../components/NoWorkouts/NoWorkouts'
import StatsContent from '../components/StatsContent/StatsContent.js'

const Stats = () => {
  const stats = useSelector(state => state.workouts.stats)

  if (stats?.allTime?.totalWorkouts === 0) {
    return (
      <NoWorkouts/>
    )
  } else {
    return (
      <StatsContent/>
    )
  }
}

export default Stats
