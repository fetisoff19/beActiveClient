import React from 'react';
import DashboardContent from "../components/DashboardContent/DashboardContent.js";
import {useSelector} from "react-redux";
import NoWorkouts from "../components/NoWorkouts/NoWorkouts";


const Dashboard = () => {
  const stats = useSelector(state => state.workouts.stats);

  if(stats?.allTime?.totalWorkouts === 0 ) return (
    <NoWorkouts/>
  )
  else return (
    <DashboardContent/>
  )
};

export default Dashboard;