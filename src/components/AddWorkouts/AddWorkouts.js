import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import FilesList from "./components/FilesList";
import {dict, userLang} from "../../config/config";
import {useDispatch, useSelector} from "react-redux";
import {uploadWorkouts} from "../../store/workouts/workouts.actions.js";
import {resetStateUploadedFiles} from "../../store/workouts/workouts.slice.js";
import {auth} from "../../store/auth/auth.actions.js";


export default function AddWorkouts() {
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const inputHiddenRef = useRef();
  const dispatch = useDispatch();
  const uploadedFiles = useSelector(state => state.workouts.uploadedFiles);


  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    setFiles([]);
    dispatch(resetStateUploadedFiles())
    setButtonClick(false)
    let workouts = [...e.dataTransfer.files]
      .filter(workout => workout.name.split('.').pop() === 'fit');
    setFiles(workouts)
    setDrag(false);
  }

  function handleClick() {
    inputHiddenRef.current.click();
  }


  function handleChange(e) {
    setFiles([]);
    dispatch(resetStateUploadedFiles())
    setButtonClick(false)
    let workouts = [...e.target.files]
      .filter(workout => workout.name.split('.').pop() === 'fit');
    setFiles(workouts)
  }

  function uploadValidatedFiles() {
    if (files?.length) {
      setButtonClick(true)
      dispatch(uploadWorkouts(files))
    }
  }

  useEffect(() => {
    if(uploadedFiles.length && files.length === uploadedFiles.length) {
      dispatch(auth())
    }
  })

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>
          {dict.title.addWorkouts[userLang]}
        </h1>
        <div className={drag ? (styles.drop + ' ' + styles.dropArea) : styles.drop}
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
             onDrop={e => onDropHandler(e)}>
        <span className={styles.label}>
          {dict.title.add1[userLang]}
          <span className={styles.input} onClick={handleClick}>
              {dict.title.browse[userLang]}
            <input
              type='file' multiple accept={'.fit'}
              ref={inputHiddenRef} onChange={handleChange}/>
            </span>
          {dict.title.add2[userLang]}
        </span>
          <FilesList
            files={files} setFiles={setFiles}
            buttonClick={buttonClick} styles={styles}/>
        </div>
        <button
          disabled={buttonClick}
          className={!buttonClick && files?.length ? styles.active : null}
          onClick={uploadValidatedFiles}>
          {dict.title.upload[userLang]}
        </button>
      </div>
    </div>

  );
};
