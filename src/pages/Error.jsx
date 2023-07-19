import React from 'react'
import { Link } from 'react-router-dom'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import { setError } from '@store/appEvents/appEvents.slice'
import { useDispatch } from 'react-redux'

const Error = ({ error }) => {
  const dispatch = useDispatch()
  console.log(error)

  function clearError () {
    dispatch(setError(null))
  }

  return (
    <div className={'page'}>
      <div className={'content error'}>
        <h1>{dictConstant.title.error[userLang] + ': ' + error?.message || 'unknown error'}</h1>
        <Link to={'/'}>
          <div onClick={clearError}>
            {dictConstant.title.goToDashboard[userLang]}
          </div>
        </Link>
      </div>
    </div>

  )
}

export default Error
