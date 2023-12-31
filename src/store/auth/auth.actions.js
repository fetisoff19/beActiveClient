import axios from 'axios'
import { logout, setAuth, setDemo, setUser } from './auth.slice.js'
import { hideLoader, hideSmallLoader, showLoader, showSmallLoader } from '../appEvents/appEvents.slice.js'
import { setAllWorkouts, setStats } from '../workouts/workouts.slice.js'
import { API_URL, demoUser } from '@constants/config.constant'

export const registration = (email, password, setRequest) => {
  return async dispatch => {
    try {
      dispatch(showSmallLoader())
      const response = await axios.post(`${API_URL}api/auth/registration`, {
        email,
        password
      })
      setRequest(response.data.message)
    } catch (e) {
      const errors = e?.response?.data?.errors?.errors[0]?.msg
      setRequest(errors || e?.response?.data?.message || e?.response?.statusText)
    } finally {
      dispatch(hideSmallLoader())
    }
  }
}

export const login = (email, password, setRequest, demo) => {
  return async dispatch => {
    try {
      dispatch(showSmallLoader())
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password
      })
      dispatch(setUser(response.data.user))
      dispatch(setAuth(true))
      dispatch(setStats(response.data.user.stats))
      localStorage.setItem('token', response.data.token)
      dispatch(setAllWorkouts(response.data.user.workouts))
      setRequest(response.data.message)
      if (demoUser.includes(response.data.user?.email) && demo) {
        dispatch(setDemo())
      }
    } catch (e) {
      console.log(e)
      setRequest(e?.response?.data?.message || e.message)
    } finally {
      dispatch(hideSmallLoader())
    }
  }
}

export const auth = (update = false) => {
  return async dispatch => {
    try {
      !update && dispatch(showLoader())
      const response = await axios.get(`${API_URL}api/auth/auth`,
        {
          headers:
            { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      dispatch(setUser(response.data.user))
      dispatch(setAuth(true))
      dispatch(setStats(response.data.user.stats))
      !update && localStorage.setItem('token', response.data.token)
      dispatch(setAllWorkouts(response.data.user.workouts))
      if (demoUser.includes(response.data.user?.email)) {
        dispatch(setDemo())
      }
    } catch (e) {
      console.log(e)
      !update && dispatch(logout()) && dispatch(setAuth(false))
    } finally {
      !update && dispatch(hideLoader())
    }
  }
}
