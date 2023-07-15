import React, {useState} from 'react';
import {dictConstant, userLang} from "@constants/dict.constant.js";
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setFunnyMarkers, setLanguage, setSmoothing} from "@store/settings/settings.slice";
import {deleteAllWorkouts, deleteUserWorkouts} from "@store/workouts/workouts.actions";
import AppLoader from "../Loaders/AppLoader";
import ModalNotice from "../UI/ModalNotice";
import {showModal} from "@store/appEvents/appEvents.slice";
import ModalTransparent from "../UI/ModalTransparent";
import ModalContent from "./components/ModalContent.js";
import Input from "../UI/Input";
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
      text={dictConstant.title.deleteAllWorkouts[userLang]}
      functionNo={deleteAll}
      functionYes={() => setClickButtonDeleteAllWorkouts(false)}
    />

  const deleteUserModalContent =
    <ModalContent
      text={dictConstant.title.deleteUserConfirmation[userLang]}
      functionNo={deleteUser}
      functionYes={() => setClickButtonDeleteUser(false)}
    />

  // const info =
  //   <div className={styles.info}>
  //     <Question stroke={'grey'} height={"20px"} width={'20px'}/>
  //     <span className={styles.tooltip}>
  //       {dictConstant.title.settingInfo[userLang]}
  //     </span>
  //   </div>



  return (
    <div className={styles.page}>
      {modal &&
        <ModalNotice
          text={dictConstant.title.notAvailableInDemoMode[userLang]}
          className={'noRules'}/>}
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
                {dictConstant.title.settings[userLang]}
              </h1>
              <form className={styles.form} action="" onSubmit={e => e.preventDefault()}>
                <div>
                  {/*<Select*/}
                  {/*  label={dictConstant.title.smoothing[userLang]}*/}
                  {/*  defaultValue={smooth}*/}
                  {/*  options={[1, 2, 4, 8, 12, 16]}*/}
                  {/*  onChange={setSmoothingHandler}*/}
                  {/*  component={info}/>*/}
                  <div>
                    <label className={styles.customInputLabel} htmlFor="markers">
                      {dictConstant.title.funnyMarkers[userLang]}
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
                  {/*    label={dictConstant.title.appLanguage[userLang]}*/}
                  {/*    defaultValue={language}*/}
                  {/*    options={['English', 'Русский']}*/}
                  {/*    onChange={setLanguageHandler}/>*/}
                  {/*  <div className={styles.info}/>*/}
                  {/*</div>*/}
                  <div>
                    <Button
                      onClick={handleClickButtonDeleteAllWorkouts}
                      text={dictConstant.title.deleteAll[userLang]}
                      className={workouts?.length && styles.active}
                    />
                    <div className={styles.info}/>
                  </div>
                  <div>
                    <Button
                      onClick={handleClickButtonDeleteUser}
                      text={dictConstant.title.deleteUser[userLang]}
                      className={styles.active}
                    />
                    <div className={styles.info}/>
                  </div>
                  <div>
                    <Button
                      onClick={handleChange}
                      text={dictConstant.title.save[userLang]}
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