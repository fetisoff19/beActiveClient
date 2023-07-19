import React from 'react'
import styles from '../styles.module.scss'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import Button from '../../UI/Button'

const ModalContent = ({ text, functionNo, functionYes }) => {
  return (
    <div className={styles.modal}>
      <h3>
        {text}
      </h3>
      <div>
        <Button
          onClick={functionNo}
          text={dictConstant.title.yes[userLang]}
          className={styles.active + ' ' + styles.yes}
        />
        <Button
          onClick={functionYes}
          text={dictConstant.title.no[userLang]}
          className={styles.active + ' ' + styles.no}
        />
      </div>
    </div>
  )
}

export default ModalContent
