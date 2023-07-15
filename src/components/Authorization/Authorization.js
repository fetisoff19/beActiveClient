import React, {useEffect, useState} from 'react';
import {dictConstant, userLang} from "@constants/dict.constant.js";
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import Input from "../UI/Input";
import {login, registration} from "@store/auth/auth.actions";
import ModalTransparent from "../UI/ModalTransparent.js";
import Button from "../UI/Button";
import {demoUser} from "@constants/config.constant";

const Authorization = () => {
  const [auth, setAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(true);
  const [request, setRequest] = useState(null);
  const loader = useSelector(state => state.app.smallLoader)
  const dispatch = useDispatch();


  useEffect(() => {
    validation();
    request === 'userWasCreated' && setAuth(true)
  }, [email, password, request])

  function validation(){
    if(password.length >= 4 && password.length <= 20 && email.length >= 7)
      setValidate(true)
    else setValidate(false)
  }

  function handleChangeAuth() {
    setAuth(prev => !prev)
  }

  function handleClick(){
    if(validate){
      auth && dispatch(login(email, password, setRequest));
      !auth && dispatch(registration(email, password, setRequest));
    }
  }

  function loginDemo(){
    dispatch(login(...demoUser, setRequest))
  }


  return (
    <div className={styles.page}>
      {loader && <ModalTransparent/>}
      <div className={styles.auth}>
        <h1>
          {auth ? dictConstant.title.signIn[userLang]
            : dictConstant.title.createAccount[userLang]}
        </h1>
        <div className={styles.request}>
          {request && dictConstant.title[request]?.en
            ? dictConstant.title[request][userLang] : request}
        </div>
        <label htmlFor="email">
          {dictConstant.title.enterEmail[userLang]}
        </label>
        <Input
          value={email} setValue={setEmail}
          styles={!validate ? styles.inputNonValidate : ''}
          type="text" id="email"
        />
        <label htmlFor="password">
          {dictConstant.title.enterPassword[userLang]}
        </label>
        <Input
          value={password} setValue={setPassword}
          styles={!validate ? styles.inputNonValidate : ''}
          type="password" id='password'
        />
        <Button
          onClick={handleClick}
          text={auth ? dictConstant.title.signIn[userLang]
            : dictConstant.title.create[userLang]}
          className={!validate ? styles.validate : ''}
        />
        <div className={styles.change}>
          {auth ? dictConstant.title.notAccount[userLang]
            : dictConstant.title.haveAccount[userLang]}
          <span onClick={handleChangeAuth}>
            {auth ? dictConstant.title.create[userLang]
              : dictConstant.title.signIn[userLang]}
          </span>
        </div>
        <div className={styles.demo}>
          {dictConstant.title.aboutDemo[userLang]}
          <Button
            onClick={loginDemo}
            text={dictConstant.title.demo[userLang]}
          />
        </div>
      </div>
    </div>
  )
};

export default Authorization;