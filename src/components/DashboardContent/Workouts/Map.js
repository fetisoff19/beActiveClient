import React, {useMemo} from 'react';
import {useEffect} from "react";
import {getPolyline} from "@store/workouts/workouts.actions";
import Maps from "../../UI/Maps.js";
import styles from "../styles.module.scss";
import variables from '@components/DashboardContent/styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import NoMap from "@components/UI/svgComponents/NoMap";

const Map = ({id}) => {
  const dispatch = useDispatch();
  const polylines = useSelector(state => state.workouts.polylines)
  let polyline = useMemo(() => polylines.find(item => item._id === id), [polylines])

  useEffect(() => {
    if(id && !polyline)
      dispatch(getPolyline(id))
  }, [])


  if(!id){
    return (
      <div className={styles.plug}>
        <NoMap fillRight={variables.appColor} fillLeft={variables.appColorGrey}/>
        {/*{dictConstant.title.indoorWorkout[userLang]}*/}
      </div>
    )
  }
  else if(polyline?.points?.length) {
    return (
      <Maps
        polylinePoints={polyline.points}
        startZoom={13}
        maxZoom={19}
        style={{height: 200, width: 200}}
        polylineStyle={{color: 'green'}}
        scrollWheelZoom={false}
      />
    )
  } else return <div className={styles.plug}/>
};

export default React.memo(Map);