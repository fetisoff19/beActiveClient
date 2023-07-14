import React from 'react';
import {NavLink} from "react-router-dom";
import {dict} from "@constants/config";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@store/auth/auth.slice";

const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const language = useSelector(state => state.settings.language)


  const logoutHandlerClick = () => {
    dispatch(logout())
  }



  const logo =
    <NavLink
      to={'/'}
      className={'logo'}>
      {'beActive'}
    </NavLink>

  const about =
    <NavLink to={'about'} className={({isActive, isPending}) =>
      isPending ? "pending" : isActive ? "active" : ""}>
      {dict.title.about[language]}
    </NavLink>


  if(isAuth) {
    return (
      <header>
        <div>
          <nav>
            {logo}
            <NavLink
              to={'/'} end
              className={({isActive, isPending}) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              {dict.title.dashBoard[language]}
            </NavLink>
            <NavLink
              to={'workouts'}
              className={({isActive, isPending}) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              {dict.title.activities[language]}
            </NavLink>
            <NavLink
              to={'stats'}
              className={({isActive, isPending}) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              {dict.title.stats[language]}
            </NavLink>
            <NavLink
              to={'add'}
              className={({isActive, isPending}) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              {dict.title.add[language]}
            </NavLink>
            <NavLink
              to={'settings'}
              className={({isActive, isPending}) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              {dict.title.settings[language]}
            </NavLink>
            {about}
          </nav>
          <a onClick={logoutHandlerClick}>
            {dict.title.out[language]}
          </a>

        </div>
      </header>
    )
  }
  else return (
    <header>
      <div>
        <nav>
          {logo}
          {about}
        </nav>
        <NavLink
          to={'/'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""}>
          {dict.title.signIn[language]}
        </NavLink>
      </div>
    </header>
  );
};

export default React.memo(Navbar);