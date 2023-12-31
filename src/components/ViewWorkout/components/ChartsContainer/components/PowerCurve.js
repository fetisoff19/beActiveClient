import React, { useContext, useMemo } from 'react'
import Charts from '@components/UI/HighCharts.js'
import { addPolylinePowerCurve } from '@helpers/viewWorkout.helpers'
import ViewWorkoutContext from '../../../context/Context.js'
import { chartsConfig } from '@constants/charts.constant'

const PowerCurve = () => {
  const {
    powerCurve,
    workout,
    setPolylinePowerCurve,
    polyline
  } = useContext(ViewWorkoutContext)

  const powerCurveData = useMemo(() => {
    if (workout.powerCurve && powerCurve?.points) {
      const map = new Map(Object.entries(powerCurve.points))
      const powerCurveArray = []
      map.forEach((value, key) =>
        powerCurveArray.push([+key, value.value])
      )
      return powerCurveArray
    }
  }, [powerCurve])

  const chart = useMemo(() =>
    powerCurveData?.length && powerCurve
      ? <Charts
          data={{ data: powerCurveData }}
          // data2={preparedData.charts.powerCurveAllTime}
          name={'powerCurve'}
          // name2={'powerCurveAllTime'}
          // powerCurveAllTimeMap={preparedData.powerCurveAllTimeMap}
          style={{ height: 210, width: 700 }}
          tooltip={true}
          addPolylinePowerCurve={addPolylinePowerCurve}
          mouseOver={[powerCurve, polyline?.points, setPolylinePowerCurve, workout?.smoothing]}
          mouseOut={() => setPolylinePowerCurve([])}
          xAxis={{
            ...chartsConfig.powerCurve.options.xAxis,
            ...{ max: powerCurveData.at(-1)[0] }
          }}
          animation={true}
        />
      : null
  , [powerCurveData])

  return (
    <>
      {chart}
    </>
  )
}

export default React.memo(PowerCurve)
