import React, {useState} from 'react';
import {dict, userLang} from "../../config/config";
import styles from './styles.module.scss'
import Question from "../UI/svgComponents/Question";
import {useDispatch, useSelector} from "react-redux";
import {setFunnyMarkers, setLanguage, setSmoothing} from "../../redux/reducers/settingsReducer";
import {deleteAllWorkouts, deleteUserWorkouts} from "../../redux/actions/workouts";
import AppLoader from "../Loaders/AppLoader";
import ModalNotice from "../UI/ModalNotice";
import {showModal} from "../../redux/reducers/appReducer";
import ModalTransparent from "../UI/ModalTransparent";
import ModalContent from "./components/ModalContent.js";
import Input from "../UI/Input";
import Select from "../UI/Select.js";
import Button from "../UI/Button";


const Settings = () => {
  const workouts = useSelector(state => state.workouts.allWorkouts);
  const language = useSelector(state => state.settings.language)
  const smoothing = useSelector(state => state.settings.smoothing)
  const funnyMarkers = useSelector(state => state.settings.funnyMarkers)
  const loader = useSelector(state => state.app.appLoader)
  const demo = useSelector(state => state.user.demo)
  const modal = useSelector(state => state.app.modal)

  const [clickButtonDeleteAllWorkouts, setClickButtonDeleteAllWorkouts] = useState(false);
  const [clickButtonDeleteUser, setClickButtonDeleteUser] = useState(false)
  const [lang, setLang] = useState(language);
  const [smooth, setSmooth] = useState(smoothing);
  const [funnyMarks, setFunnyMarks] = useState(funnyMarkers);
  const [stylesActive, setStylesActive] = useState(false);
  const dispatch = useDispatch()


  // function setLanguageHandler(e){
  //   setLang(e.target.value === 'Русский' ? 'ru' : 'en');
  //   setStylesActive(true);
  // }

  function setSmoothingHandler(e){
    setSmooth(e.target.value);
    setStylesActive(true);
  }

  function setFunnyMarkersHandler(){
    setFunnyMarks(prev => !prev);
    setStylesActive(true);
  }

  function handleChange() {
    dispatch(setLanguage(lang));
    dispatch(setSmoothing(smooth));
    dispatch(setFunnyMarkers(funnyMarks));
    setStylesActive(false);
  }

   function deleteAll(){
    if(demo){
      dispatch(showModal())
    } else {
      dispatch(deleteAllWorkouts(workouts))
      setClickButtonDeleteAllWorkouts(false)
    }
  }

  function handleClickButtonDeleteAllWorkouts(){
    workouts?.length > 0
      && setClickButtonDeleteAllWorkouts(true);
  }

  function handleClickButtonDeleteUser(){
    setClickButtonDeleteUser(true);
  }

  function deleteUser(){
    if(demo){
      dispatch(showModal())
    }
    else {
      dispatch(deleteUserWorkouts())
      setClickButtonDeleteUser(false)
    }
  }

  const deleteAllWorkoutsModalContent =
    <ModalContent
      text={dict.title.deleteAllWorkouts[userLang]}
      functionNo={deleteAll}
      functionYes={() => setClickButtonDeleteAllWorkouts(false)}
    />

  const deleteUserModalContent =
    <ModalContent
      text={dict.title.deleteUserConfirmation[userLang]}
      functionNo={deleteUser}
      functionYes={() => setClickButtonDeleteUser(false)}
    />

  // const info =
  //   <div className={styles.info}>
  //     <Question stroke={'grey'} height={"20px"} width={'20px'}/>
  //     <span className={styles.tooltip}>
  //       {dict.title.settingInfo[userLang]}
  //     </span>
  //   </div>



  return (
    <div className={styles.page}>
      {modal &&
        <ModalNotice
          text={dict.title.notAvailableInDemoMode[userLang]}
          className={'modalNotice '}/>}
      {clickButtonDeleteAllWorkouts &&
        <ModalTransparent
          content={deleteAllWorkoutsModalContent}
          className={styles.cursorAuto}
          setState={setClickButtonDeleteAllWorkouts}
        />}

      {clickButtonDeleteUser &&
        <ModalTransparent
          content={deleteUserModalContent}
          className={styles.cursorAuto}
          setState={setClickButtonDeleteUser}
        />}
      {
        loader
          ? <AppLoader cursorWait={true}/>
          : <div className={styles.content}>


              <h1>
                {dict.title.settings[userLang]}
              </h1>
              <form className={styles.form} action="" onSubmit={e => e.preventDefault()}>
                <div>
                  {/*<Select*/}
                  {/*  label={dict.title.smoothing[userLang]}*/}
                  {/*  defaultValue={smooth}*/}
                  {/*  options={[1, 2, 4, 8, 12, 16]}*/}
                  {/*  onChange={setSmoothingHandler}*/}
                  {/*  component={info}/>*/}
                  <div>
                    <label className={styles.customInputLabel} htmlFor="markers">
                      {dict.title.funnyMarkers[userLang]}
                      <Input
                        type="checkbox" id={"markers"} name={"markers"}
                        checked={funnyMarks}
                        setValue={setFunnyMarkersHandler}/>
                      <span className={styles.customInput}/>
                    </label>
                    <div className={styles.info}/>
                  </div>
                  {/*<div>*/}
                  {/*  <Select*/}
                  {/*    label={dict.title.appLanguage[userLang]}*/}
                  {/*    defaultValue={language}*/}
                  {/*    options={['English', 'Русский']}*/}
                  {/*    onChange={setLanguageHandler}/>*/}
                  {/*  <div className={styles.info}/>*/}
                  {/*</div>*/}
                  <div>
                    <Button
                      onClick={handleClickButtonDeleteAllWorkouts}
                      text={dict.title.deleteAll[userLang]}
                      className={workouts?.length && styles.active}
                    />
                    <div className={styles.info}/>
                  </div>
                  <div>
                    <Button
                      onClick={handleClickButtonDeleteUser}
                      text={dict.title.deleteUser[userLang]}
                      className={styles.active}
                    />
                    <div className={styles.info}/>
                  </div>
                  <div>
                    <Button
                      onClick={handleChange}
                      text={dict.title.save[userLang]}
                      className={stylesActive && styles.active}
                    />
                    <div className={styles.info}/>
                  </div>
                </div>
              </form>
            </div>
      }
    </div>
  )
};

export default Settings;