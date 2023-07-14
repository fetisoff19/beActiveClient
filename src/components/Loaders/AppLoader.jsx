import React from 'react';
import {TailSpin} from "react-loader-spinner";
import {useEffect} from "react";
import {cursorWaitOff, cursorWaitOn} from "@store/appEvents/appEvents.slice";
import {useDispatch} from "react-redux";
import variables from "../DashboardContent/styles.module.scss";

const AppLoader = ({height, width, cursorWait}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    cursorWait && dispatch(cursorWaitOn())
    return () => {
      cursorWait && dispatch(cursorWaitOff())
    }
  }, []);


  return (
    <div className='center'>
      <TailSpin
        height={height || '80'}
        width={width || '80'}
        color={variables.appColor}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{zIndex: '2'}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default AppLoader;