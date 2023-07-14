import React, {useState} from 'react';
import {dict, userLang} from "../../../config/config";
import BlockMetricContainer from "./BlockMetricContainer";
import ChangeName from "../../UI/ChangeName";
import styles from '../styles.modules'
import Delete from "../../UI/svgComponents/Delete";
import SportsIcon from "../../UI/SportsIcon.js";
import {useDispatch, useSelector} from "react-redux";
import AppLoader from "../../Loaders/AppLoader";
import {addFilesToDelete} from "../../../store/workouts/workouts.slice.js";
import {showModal, showSmallLoader} from "../../../store/appEvents/appEvents.slice.js";


const ListItem = ({data}) => {
  const [clicked, setClicked] = useState(false);
  const smallLoaderId = useSelector(state => state.app.smallLoaderId);
  const filesToDelete = useSelector(state => state.workouts.filesToDelete);
  const demo = useSelector(state => state.user.demo);
  const dispatch = useDispatch();

  function deleteWorkout(id){
    if(demo){
      dispatch(showModal())
    }
    else if(!clicked) {
      setClicked(true);
      dispatch(addFilesToDelete(id));
      dispatch(showSmallLoader(data._id));
    }
  }

  return (
    <li className={styles.listItem}>
      <SportsIcon className={'icon ' + styles.icon} sport={data.sport}/>
      <div className={styles.sBlock}  key={data._id + 'timestamp'}>
        <span className={styles.unit}>
          {new Date(data?.timestamp).getDate() + ' ' + dict.month[new Date(data?.timestamp).getMonth()][userLang]}
        </span>
        <span className={styles.label}>
          {new Date(data?.timestamp).getFullYear()}
        </span>
      </div>
      <div className={styles.lBlock} key={data.workoutName}>
        <ChangeName data={data} isLink={true} styles={styles} />
        <div className={styles.label}>
          {dict.sports.hasOwnProperty(data.sport)
            ? dict.sports[data.sport][userLang]
            : dict.sports.other[userLang]}
        </div>
      </div>
      <BlockMetricContainer data={data}/>
      <div key={data.timestamp}>
      <div className={styles.xsBlock}
        onClick={() => deleteWorkout(data._id)}>
        {smallLoaderId.includes(data._id) && filesToDelete.includes(data._id)
          ? <AppLoader height={'20'} width={'20'} cursorWait={true}/>
          : <Delete className={styles.delete} />}
      </div>
      </div>
    </li>
  );
};

export default ListItem;