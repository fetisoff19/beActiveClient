import React, { useContext } from 'react'
import styles from '../../../styles.module.scss'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import Info from '../../../../Svg/Info.js'

import ViewWorkoutContext from '../../../context/Context.js'
import { resetZoom } from '@helpers/viewWorkout.helpers'

const ResetZoomAndInfo = () => {
  const { dataForCharts, zooming, setZooming } = useContext(ViewWorkoutContext)

  function handleClick () {
    resetZoom()
    setZooming(false)
  }

  return (
    <div className={styles.resetZoomInfo}>
      <div
        className={styles.resetZoom}
        hidden={!zooming || !dataForCharts}
        onClick={handleClick}
      >
        {dictConstant.title.resetZoom[userLang]}
      </div>
      <div className={styles.info}>
        <span className={styles.tooltip}>
          {dictConstant.title.info1[userLang]}
        </span>
        <Info className={styles}/>
      </div>
    </div>
  )
}

export default React.memo(ResetZoomAndInfo)
