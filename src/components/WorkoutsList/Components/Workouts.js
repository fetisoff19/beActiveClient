import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ListItem from "./ListItem";
import ThreeDotsLoader from "../../Loaders/ThreeDotsLoader";
import WorkoutsNotFound from "./WorkoutsNotFound.js";
import {deleteOneWorkout} from "../../../store/workouts/workouts.actions.js";
import styles from '../styles.modules'


const Workouts = ({page, search}) => {
  const workouts = useSelector(state => state.workouts.workouts);
  const allWorkouts = useSelector(state => state.workouts.allWorkouts);
  const filesToDelete = useSelector(state => state.workouts.filesToDelete);
  const user = useSelector(state => state.user.currentUser);
  const loader = useSelector(state => state.app.appLoader);
  const dispatch = useDispatch();

  const list = user?.workouts?.length && workouts?.length
    ? workouts.map(item =>
      <ListItem key={Math.random()} data={item}/>)
    : null;

  useEffect(() => {
    if(filesToDelete.length > 1){
      dispatch(deleteOneWorkout(filesToDelete[0]));
    }
  }, [allWorkouts.length])

  useEffect(() => {
    if(filesToDelete.length === 1){
      dispatch(deleteOneWorkout(filesToDelete[0]));
    }
  }, [filesToDelete])


  return (
    <>
      {list}
      {loader && page > 1 && <ThreeDotsLoader/>}
      {!loader && search && !list  && <WorkoutsNotFound styles={styles}/>}
    </>
  );
};

export default Workouts;