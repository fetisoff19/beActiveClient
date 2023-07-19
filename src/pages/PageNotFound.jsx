import React from 'react'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className={'page'}>
      <div className={'content error'}>
        <h1>{dictConstant.title.pageNotFound[userLang]}</h1>
        <Link to={'/'}>{dictConstant.title.goToDashboard[userLang]}</Link>
      </div>
    </div>

  )
}

export default PageNotFound
