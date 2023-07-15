import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useEffect} from "react";
import {addFilesToUpload} from "@store/workouts/workouts.slice";
import ModalNotice from "@components/UI/ModalNotice";
import {useLocation} from "react-router";
import {dictConstant, userLang} from "@constants/dict.constant.js";

const UploadFilesModal = () => {
  const filesToUpload = useSelector(state => state.workouts.filesToUpload);
  const uploadedFiles = useSelector(state => state.workouts.uploadedFiles);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const delay = 3000;
  const uploadedEnd = filesToUpload?.length > 0 && filesToUpload?.length === uploadedFiles?.length
  const text = `${dictConstant.title.filesUploaded[userLang]}: ${uploadedFiles.length}/${filesToUpload.length}`


  useEffect(() => {
    if(location.pathname?.replaceAll('/','') !== 'add') {
      filesToUpload?.length > 0 && setShowModal(true);
      if (uploadedEnd) {
        setTimeout(() => {
          setShowModal(false)
          dispatch(addFilesToUpload([]));
        }, delay)
      }
    }
  }, [filesToUpload, uploadedFiles])

  const uploadStatusModal =
    showModal
      ? <ModalNotice
        delay={!uploadedEnd ? 10**6 : delay/2}
        className={'uploadModal'}
        text={text}/>
      : null

  return (
    <>
      {uploadStatusModal}
    </>
  );
};

export default React.memo(UploadFilesModal);