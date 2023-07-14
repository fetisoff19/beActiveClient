import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {hideModal} from "../../store/appEvents/appEvents.slice.js";

const ModalNotice = ({text, className}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState('')

  useEffect(() => {
    setVisible('visible')
    let timeoutHide = setTimeout(() => {
      setVisible('')
    }, 2500);
    let timeoutHideModal = setTimeout(() => {
        dispatch(hideModal())
      }, 3000);

    return () => {
      clearTimeout(timeoutHideModal);
      clearTimeout(timeoutHide);
      dispatch(hideModal());
      setVisible('')
    }
  },[])

  function handleClick() {
    setVisible('');
  }

  return (
    <div className={className + visible} onClick={handleClick}>
      <div>
        {text}
      </div>
    </div>
  );
};

export default ModalNotice;