import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {hideModal} from "@store/appEvents/appEvents.slice";

const ModalNotice = ({text, className, delay = 2500}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState('')

  useEffect(() => {
    setVisible(' visible')
    let timeoutHide = setTimeout(() => {
      setVisible('')
    }, delay);

    let timeoutHideModal = setTimeout(() => {
        dispatch(hideModal())
      },
      delay + 500);

    return () => {
      clearTimeout(timeoutHideModal);
      clearTimeout(timeoutHide);
      dispatch(hideModal());
      setVisible('')
    }
  },[delay])

  function handleClick() {
    setVisible('');
  }

  return (
    <div
      className={'modalNotice' + ' ' + className + visible}
      onClick={handleClick}>
      <div>
        {text}
      </div>
    </div>
  );
};

export default ModalNotice;