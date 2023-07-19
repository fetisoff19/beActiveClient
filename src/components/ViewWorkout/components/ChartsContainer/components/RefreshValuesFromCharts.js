import React, { useContext } from 'react'
import { getHourMinSec, getMinSec } from '@helpers/functionsDate&Values.helpers'
import { dictConstant, userLang } from '@constants/dict.constant.js'

import ViewWorkoutContext from '../../../context/Context.js'
import styles from '../../../styles.module.scss'
import { chartsConfig } from '@constants/charts.constant'

const RefreshValuesFromCharts = ({ chartsNames }) => {
  const { dataForCharts, index } = useContext(ViewWorkoutContext)

  const data = dataForCharts?.charts
  const timeArray = dataForCharts?.timeArray
  const validate = index <= timeArray.length

  const tbody = chartsNames.map(item => {
    let value = ''
    const validateData = data[item]?.data[index] && validate ? data[item]?.data[index][1] : null

    Number.isInteger(index) && item === 'pace' && isFinite(validateData)
      ? value = getMinSec(validateData)
      : Number.isInteger(index) && isFinite(validateData)
        ? value = validateData.toString().replaceAll('.', ',')
        : ''

    return (
        <td
          style={{ color: chartsConfig[item].themeColor, minWidth: 65 }}
          key={item}>
          {value || '--'}
        </td>)
  }
  )

  tbody.push(
    <td key={'distance'} style={{ color: 'green', minWidth: 75 }}>
      {Number.isInteger(index) && chartsNames[0] && data[chartsNames[0]] && validate
        ? data[chartsNames[0]]?.data[index][0].toString().replaceAll('.', ',')
        : '--'}
    </td>,
    <td key={'time'} style={{ color: 'gray', minWidth: 85 }}>
      {Number.isInteger(index) && validate
        ? getHourMinSec(timeArray[index])
        : '--'}
    </td>
  )
  const thead = chartsNames.map(item =>
    <td key={item} scope="col">
      {dictConstant.fields[item][userLang]}
    </td>)
  thead.push(
    <td key={'distance'} scope="col">
      {dictConstant.fields.totalDistance[userLang]}
    </td>,
    <td key={'time'} scope="col">
      {dictConstant.fields.time[userLang]}
    </td>)

  return (
    <table className={styles.refreshValues}>
      <thead>
      <tr>
        {thead}
      </tr>
      </thead>
      <tbody>
      <tr>
        {tbody}
      </tr>
      </tbody>
    </table>
  )
}

export default RefreshValuesFromCharts
