import React from 'react'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import Body from '../../Svg/Body'

const WorkoutsNotFound = ({ styles }) => {
  return (
    <div className={styles.notFound}>
      <Body/>
      <h3>
        {dictConstant.title.notFound[userLang]}
      </h3>
    </div>
  )
}

export default WorkoutsNotFound
