import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Edit from "./svgComponents/Edit";
import Ok from "./svgComponents/Ok";
import Close from "./svgComponents/Close";
import {useDispatch, useSelector} from "react-redux";
import {editWorkout} from "../../redux/actions/workouts";
import AppLoader from "../Loaders/AppLoader";

const ChangeName = ({data, isLink, styles, setState}) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(data.workoutName);
  const router = useLocation();
  const filesToDelete = useSelector(state => state.workouts.filesToDelete)
  const smallLoaderId = useSelector(state => state.app.smallLoaderId);

  async function saveName() {
    if(value && value !== data.workoutName)
    dispatch(editWorkout(data._id, 'workoutName', value))
  }

  // console.log(data.workoutName, value)
  const handleChange = e => setValue(e.target.value);
  const handleFocus = e => e.target.select();

  const valueLength = value?.toString().length || 1
  const inputSize = valueLength > 18 ? 18 : valueLength

  const input =
    <input
      className={disabled
        ? (styles?.input + ' ' +  styles?.read)
        : (styles?.input + ' ' +  styles?.edit)}
      disabled={disabled}
      type="text"
      id={data?._id + 'input'}
      value={value}
      size={inputSize}
      autoFocus={true}
      onChange={handleChange}
      onFocus={(e) => {
        handleFocus(e);
        setState && setState(true);
      }}
      onBlur={() => setState && setState(false)}
  />

  return isLink ? (
      <div className={styles?.changeName}>
        {disabled
          ?
          <Link to={router.pathname + `/${data._id}`}>
            {input}
          </Link>
          : input
        }
        <div
          className={styles?.button}
          onClick={() => {
            setDisabled(prev => !prev);
            !disabled ? saveName() : null;
          }}
        >{disabled
          ? <Edit className={styles?.edit}/>
          : <Ok className={styles.svg} fill={'grey'}/>}
        </div>
        <div
          className={!disabled ? styles?.button : ''}
          hidden={disabled}
          onClick={() => {
            setDisabled(true);
            setValue(data.workoutName);
          }}>
          <Close className={styles.close} fill={'grey'}/>
        </div>
        {smallLoaderId.includes(data._id) && !filesToDelete.includes(data._id)
          && <AppLoader height={'20'} width={'20'} cursorWait={true}/>}
      </div>
  )
    :
    (
      <div className={styles?.changeName}>
        {input}
        <div
          className={styles?.button}
          onClick={() => {
            setDisabled(prev => !prev);
            !disabled ? saveName() : null;
          }}
        >{disabled
          ? <Edit className={styles?.edit}  />
          : <Ok className={styles?.svg}/>}
        </div>
        <div
          className={!disabled ? styles?.button : ''}
          hidden={disabled}
          onClick={() => {
            setDisabled(true);
            setValue(data.workoutName);
          }}>
          <Close className={styles?.close}/>
        </div>
        {smallLoaderId.includes(data._id) && !filesToDelete.includes(data._id)
          && <AppLoader height={'20'} width={'20'} cursorWait={true}/>}
      </div>
    )
};

export default React.memo(ChangeName);