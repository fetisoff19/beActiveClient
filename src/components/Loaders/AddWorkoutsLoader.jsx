import React from 'react';
import {ThreeDots} from "react-loader-spinner";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {cursorWaitOff, cursorWaitOn} from "../../redux/reducers/appReducer";
import variables from '../DashboardContent/styles.module.scss'


const AddWorkoutsLoader = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cursorWaitOn())
    return () => {
      dispatch(cursorWaitOff())
    }
  }, []);


  return (
    <div className='container'>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color={variables.appColor}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default AddWorkoutsLoader;