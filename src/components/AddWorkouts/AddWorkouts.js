import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import FilesList from './components/FilesList'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { uploadWorkouts } from '@store/workouts/workouts.actions'
import { addFilesToUpload, resetStateUploadedFiles } from '@store/workouts/workouts.slice'
import { auth } from '@store/auth/auth.actions'

export default function AddWorkouts () {
  const [files, setFiles] = useState([])
  const [drag, setDrag] = useState(false)
  const [buttonClick, setButtonClick] = useState(false)
  const inputHiddenRef = useRef()
  const dispatch = useDispatch()
  const uploadedFiles = useSelector(state => state.workouts.uploadedFiles)

  function dragStartHandler (e) {
    e.preventDefault()
    setDrag(true)
  }

  function dragLeaveHandler (e) {
    e.preventDefault()
    setDrag(false)
  }

  function onDropHandler (e) {
    e.preventDefault()
    setFiles([])
    dispatch(resetStateUploadedFiles())
    setButtonClick(false)
    const workouts = [...e.dataTransfer.files]
      .filter(workout => workout.name.split('.').pop() === 'fit')
    setFiles(workouts)
    setDrag(false)
  }

  function handleClick () {
    inputHiddenRef.current.click()
  }

  function handleChange (e) {
    setFiles([])
    dispatch(resetStateUploadedFiles())
    setButtonClick(false)
    const workouts = [...e.target.files]
      .filter(workout => workout.name.split('.').pop() === 'fit')
    setFiles(workouts)
  }

  function uploadValidatedFiles () {
    if (files?.length) {
      setButtonClick(true)
      dispatch(uploadWorkouts(files))
      dispatch(addFilesToUpload(files))
    }
  }

  useEffect(() => {
    return () => {
      if (uploadedFiles.length && files.length === uploadedFiles.length) {
        dispatch(auth())
        dispatch(resetStateUploadedFiles())
      }
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>
          {dictConstant.title.addWorkouts[userLang]}
        </h1>
        <div className={drag ? (styles.drop + ' ' + styles.dropArea) : styles.drop}
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
             onDrop={e => onDropHandler(e)}>
        <span className={styles.label}>
          {dictConstant.title.add1[userLang]}
          <span className={styles.input} onClick={handleClick}>
              {dictConstant.title.browse[userLang]}
            <input
              type='file' multiple accept={'.fit'}
              ref={inputHiddenRef} onChange={handleChange}/>
            </span>
          {dictConstant.title.add2[userLang]}
        </span>
          <FilesList
            files={files} setFiles={setFiles}
            buttonClick={buttonClick} styles={styles}/>
        </div>
        <button
          disabled={buttonClick}
          className={!buttonClick && files?.length ? styles.active : null}
          onClick={uploadValidatedFiles}>
          {dictConstant.title.upload[userLang]}
        </button>
      </div>
    </div>

  )
};
