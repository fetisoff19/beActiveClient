import React from 'react';
import styles from "../styles.module.scss";
import {dict, userLang} from "../../../config/config.js";
import Button from "../../UI/Button";

const ModalContent = ({text, functionNo, functionYes}) => {

  return (
    <div className={styles.modal}>
      <h3>
        {text}
      </h3>
      <div>
        <Button
          onClick={functionNo}
          text={dict.title.yes[userLang]}
          className={styles.active + ' ' + styles.yes}
        />
        <Button
          onClick={functionYes}
          text={dict.title.no[userLang]}
          className={styles.active + ' ' + styles.no}
        />
      </div>
    </div>
  );
};

export default ModalContent;