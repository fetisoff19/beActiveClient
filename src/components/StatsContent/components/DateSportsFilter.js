import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import SportsFilter from '../../UI/SportsFilter'

import { dictConstant, userLang } from '@constants/dict.constant.js'
import { getStats } from '@store/workouts/workouts.actions'
import { useDispatch } from 'react-redux'
import StatsForPeriod from './StatsForPeriod'
import { dayInMs, getDataForInputDate } from '@helpers/functionsDate&Values.helpers'
import Search from '../../Svg/Search'

const arrPeriod = ['7', '28', '180', '365']

const DateSportsFilter = (
  { minDate, maxDate }
) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [period, setPeriod] = useState('')
  const [customPeriod, setCustomPeriod] = useState(false)
  const [sport, setSport] = useState('all')
  const dispatch = useDispatch()

  const timePeriod = arrPeriod.map(item =>
    <div
      key={item}
      onClick={() => handleClickPeriod(item)}
      className={item === period && !customPeriod ? styles.check : ''}
    >
      {dictConstant.title[item][userLang]}
    </div>)

  function correctLastDate (date) {
    return date
      ? new Date(date).setHours(23, 59, 59)
      : new Date().setHours(23, 59, 59)
  }

  function handleClickPeriod (item) {
    setCustomPeriod(false)
    let newDate = new Date()
    const month = new Date().getMonth()
    if (item === '365') {
      newDate = new Date(newDate.setMonth(month - 11, 1))
        .setHours(0, 0, 0, 0)
    } else if (item === '180') {
      newDate = new Date(newDate.setMonth(month - 5, 1))
        .setHours(0, 0, 0, 0)
    } else if (item === '28' || item === '7') {
      newDate = new Date()
        .setHours(0, 0, 0, 0) - ((+item - 1) * dayInMs)
    }
    setPeriod(item)
    setStartDate(newDate)
    setEndDate(correctLastDate())
  }

  useEffect(() =>
    handleClickPeriod(arrPeriod[3])
  , [])

  function handleClickSport (item) {
    setSport(item)
  }

  function handleChangeFirstDate (e) {
    setStartDate(e.target.valueAsNumber)
  }

  function handleChangeSecondDate (e) {
    setEndDate(correctLastDate(e.target.value))
  }

  function search () {
    if (startDate && endDate && sport) {
      dispatch(getStats(sport, startDate, endDate))
    }
  }

  function customPeriodSearch () {
    setCustomPeriod(true)
    search()
  }

  useEffect(() => {
    search()
  },
  [sport])

  useEffect(() => {
    !customPeriod && search()
  },
  [period, customPeriod])

  return (
    <div>
      <div className={styles.filterBar}>
        <div className={styles.dateFilter}>
          {timePeriod}
          <div
            className={styles.date + (customPeriod
              ? (' ' + styles.check)
              : '')}>
            <input
              type="date" id="first" name="first"
              onChange={handleChangeFirstDate}
              value={getDataForInputDate(startDate)} step={1}
              min={minDate} max={maxDate}
            />
            <input
              type="date" id="second" name="second"
              value={getDataForInputDate(endDate)} step={1}
              onChange={handleChangeSecondDate}
              min={minDate} max={maxDate}
            />
            <div
              className={styles.search}
              onClick={customPeriodSearch}>
              <Search/>
            </div>
          </div>
        </div>
        <SportsFilter
          sport={sport}
          onClick={handleClickSport}
          styles={styles}/>
      </div>
      <StatsForPeriod
        sport={sport} startDate={startDate}
        endDate={endDate} period={period}
        customPeriod={customPeriod}/>
    </div>
  )
}

export default DateSportsFilter
