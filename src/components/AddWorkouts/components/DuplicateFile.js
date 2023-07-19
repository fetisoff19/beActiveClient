import React from 'react'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import { Link } from 'react-router-dom'

const DuplicateFile = ({ data, className }) => {
  const [id, name] = data

  return (
    <div className={className}>
      <div>{name}</div>
      <div>
        <span>{dictConstant.title.duplicateFile[userLang] + '. '}</span>
        <Link to={'../workouts/' + id}>
          <span>{dictConstant.title.more[userLang]}</span>
        </Link>
      </div>

    </div>
  )
}

export default DuplicateFile
