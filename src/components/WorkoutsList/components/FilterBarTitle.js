import React from 'react'
import styles from '../styles.modules.scss'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import FilterBar from './FilterBar'
import Titles from './Titles'
import { useSelector } from 'react-redux'
import ModalNotice from '../../UI/ModalNotice'

const FilterBarTitle = () => {
  const stats = useSelector(state => state.workouts.stats)
  const modal = useSelector(state => state.app.modal)

  return (
    <div className={styles.up}>
      {modal &&
        <ModalNotice
          text={dictConstant.title.notAvailableInDemoMode[userLang]}
          className={'noRules'}/>}
      {stats?.allTime?.totalWorkouts > 0 &&
        <>
          <h1>
            {dictConstant.title.activities[userLang]}
          </h1>
          <FilterBar/>
          <Titles/>
        </>
      }
    </div>
  )
}

export default FilterBarTitle
