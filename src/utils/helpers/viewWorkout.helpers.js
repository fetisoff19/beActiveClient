import { convertPaceInMinute, convertSpeed } from './functionsDate&Values.helpers.js'
import Highcharts from 'highcharts'
import Charts from '../../components/UI/HighCharts.js'
import React from 'react'

export function getDataForCharts (data, workout) {
  let result = {}
  const speedDistanceArray = []
  const powerDistanceArray = []
  const heartRateDistanceArray = []
  const cadenceDistanceArray = []
  const altitudeDistanceArray = []
  const timeArray = []

  data.forEach(item => {
    speedDistanceArray.push([item.distance, item.speed])
    powerDistanceArray.push([item.distance, item.power])
    heartRateDistanceArray.push([item.distance, item.heartRate])
    cadenceDistanceArray.push([item.distance, item.cadence])
    altitudeDistanceArray.push([item.distance, item.altitude])
    timeArray.push(item.timestamp)
  })

  result = {
    charts: {
      speed: workout.k === 1
        ? {
            data: speedDistanceArray,
            avg: convertSpeed(workout?.avgSpeed),
            min: 0,
            max: convertSpeed(workout?.maxSpeed)
          }
        : null,
      // eslint-disable-next-line multiline-ternary
      pace: workout.k === 2 ? {
        data: speedDistanceArray,
        avg: convertPaceInMinute(workout?.enhancedAvgSpeed)
        // max: convertPaceInMinute(workout?.enhancedMaxSpeed),
      } : null,
      power: {
        data: powerDistanceArray,
        avg: workout?.avgPower,
        min: 0,
        max: workout?.maxPower
      },
      heartRate: {
        data: heartRateDistanceArray,
        avg: workout?.avgHeartRate,
        min: workout?.minHeartRate,
        max: workout?.maxHeartRate
      },
      cadence: {
        data: cadenceDistanceArray,
        avg: workout?.avgCadence,
        min: 0,
        max: workout?.maxCadence
      },
      altitude: {
        data: altitudeDistanceArray,
        avg: workout?.avgAltitude,
        min: workout?.minAltitude,
        max: workout?.maxAltitude
      }
      // powerCurve: powerCurveArray.length && {
      //   data: powerCurveArray,
      // },
      // powerCurveAllTime: workoutData?.workout?.powerCurveAllTime && {
      //   data: workoutData?.workout?.powerCurveAllTime,
      // } || null,
    },
    step: Math.round(workout?.timeStep),
    timeArray,
    smoothing: workout.smoothing,
    // powerCurveAllTimeMap: workoutData?.workout?.powerCurveAllTimeMap || null,
    sport: workout.sport,
    k: workout?.k || 1
  }

  // console.log(result, workout, workout?.minHeartRate)

  return result
}

export function setCharts (data, order, setZooming, setLoaded) {
  if (data) {
    const result = []
    order.forEach(item => {
      if (data.charts[item]?.avg && data.charts[item]?.data.length) {
        result.push(
          <Charts
            sport={data.sport}
            key={Math.random()}
            animation={false}
            step={data.step}
            k={data.k}
            name={item} data={data.charts[item]}
            // сводим к минимуму вероятность ошибки для работы customCrosshair и refreshValues
            setLoaded={() => setLoaded ? setTimeout(() => setLoaded(true), 500) : null}
            selection={() => {
              zooming()
              setZooming(true)
            }}
            style={{ height: 210, width: 680 }}/>
        )
      }
    })
    return result
  }
}

export function getIndex (e, setIndex, ref) {
  const charts = Highcharts.charts
  if (ref && charts?.length) {
    const width = +document.querySelector('.highcharts-plot-border').getAttribute('width')
    const rect = ref.getBoundingClientRect()
    const padding = charts[0]?.plotLeft
    let x = (e.clientX - rect?.x - padding)
    if (x < 0) x = 0
    if (x > width) x = width

    const getNumber = (arr, searchNum) =>
      arr.find(it =>
        Math.abs(it?.clientX - searchNum) ===
        Math.min(...arr.map(it => Math.abs(it?.clientX - searchNum)))
      )

    const arrayPoints = charts[0]?.series[0]?.points
    if (arrayPoints?.length > 0) {
      const step = Math.ceil(width / arrayPoints.length)
      let index = 0
      const minIndex = arrayPoints.findIndex(item => Math.abs(x - item.clientX) <= step)
      const maxIndex = arrayPoints.findLastIndex(item => Math.abs(x - item.clientX) <= step)
      const arr = arrayPoints.slice(minIndex || 0, maxIndex ? maxIndex + 1 : arrayPoints.length - 1)
      if (arr.length) {
        index = getNumber(arr, x).index ? getNumber(arr, x).index : 0
        setIndex(index)
      }
    }

    for (const chart of charts) {
      if (chart.series[0].name === 'powerCurve') continue
      if (chart.customCrosshair) {
        chart.customCrosshair.element.remove()
      }

      chart.customCrosshair = chart.renderer
        .rect(+x + chart.plotLeft, chart.plotTop, 0.5, chart.plotSizeY)
        .attr({
          fill: '#383838',
          zIndex: 1
        })
        .add()
    }
  }
}

export function handleKeyboardDown (e, setZooming) {
  const chart = Highcharts.charts[0] || null
  const powerCurve = Highcharts.charts.at(-1) || null
  switch (e.code) {
    case 'ArrowLeft':
      e.preventDefault()
      refreshPosition(true, chart)
      refreshPosition(true, powerCurve)
      break
    case 'ArrowRight':
      e.preventDefault()
      refreshPosition(false, chart)
      refreshPosition(false, powerCurve)
      break
    case 'NumpadAdd':
    case 'Equal':
    case 'ArrowUp':
      e.preventDefault()
      zoomIn(chart, setZooming)
      break
    case 'NumpadSubtract':
    case 'Minus':
    case 'ArrowDown':
      e.preventDefault()
      zoomOut(chart, setZooming)
      break
    case 'Enter':
    case 'NumpadEnter':
    case 'Space':
      e.preventDefault()
      resetZoom()
      setZooming(false)
      break
  }
}

export function zooming () {
  Highcharts.charts.forEach(chart => {
    if (chart.series[0].name !== 'powerCurve') {
      chart.xAxis[0].update({
        events: {
          afterSetExtremes: function (event) {
            Highcharts.charts.forEach(otherChart => {
              if ((otherChart.xAxis[0].min !== event.min || otherChart.xAxis[0].max !== event.max) &&
                (otherChart.series[0].name !== 'powerCurve')) {
                otherChart.xAxis[0].setExtremes(event.min, event.max)
              }
            })
          }
        }
      })
    }
  })
}

// dir ? left : right
export function refreshPosition (dir, chart) {
  if (!chart) return
  let positionMinX = chart.xAxis[0].min
  let positionMaxX = chart.xAxis[0].max
  let offsetPlus = (positionMaxX - positionMinX) / 10
  let offsetMinus = (positionMaxX - positionMinX) / 10
  const dataMin = chart.xAxis[0].dataMin
  const dataMax = chart.xAxis[0].dataMax
  if (positionMinX - offsetMinus <= dataMin) {
    positionMinX = dataMin
    offsetMinus = 0
  }
  if (positionMaxX + offsetPlus >= dataMax) {
    positionMaxX = dataMax
    offsetPlus = 0
  }
  if (dir) chart.xAxis[0].setExtremes(positionMinX - offsetMinus, positionMaxX - offsetMinus)
  else chart.xAxis[0].setExtremes(positionMinX + offsetPlus, positionMaxX + offsetPlus)
}

export function zoomIn (chart, setZooming) {
  if (!chart) return
  const positionMinX = chart.xAxis[0].min
  const positionMaxX = chart.xAxis[0].max
  const offsetPlus = (positionMaxX - positionMinX) / 6
  chart.xAxis[0].setExtremes(positionMinX + offsetPlus, positionMaxX - offsetPlus)
  if (setZooming) {
    setZooming(true)
    zooming()
  }
}

export function zoomOut (chart, setZooming) {
  if (!chart) return
  let positionMinX = chart.xAxis[0].min
  let positionMaxX = chart.xAxis[0].max
  const dataMin = chart.xAxis[0].dataMin
  const dataMax = chart.xAxis[0].dataMax
  let offsetPlus = (positionMaxX - positionMinX) / 10
  let offsetMinus = (positionMaxX - positionMinX) / 10
  if (positionMinX - offsetMinus <= dataMin) {
    if (setZooming) {
      setZooming(true)
      zooming()
    }
    positionMinX = dataMin
    offsetMinus = 0
  }
  if (positionMaxX + offsetPlus >= dataMax) {
    if (setZooming) {
      setZooming(false)
    }
    positionMaxX = dataMax
    offsetPlus = 0
  }
  chart.xAxis[0].setExtremes(positionMinX - offsetMinus, positionMaxX + offsetPlus)
}

export function resetZoom () {
  const chart = Highcharts.charts[0] || null
  if (!chart) return
  Highcharts.charts.forEach(chart =>
    chart.xAxis[0]
      .setExtremes(chart.xAxis[0].dataMin, chart.xAxis[0].dataMax)
  )
}

export function addPolylinePowerCurve (point, powerCurve, polyline, setState, smoothing) {
  // console.log(point, powerCurve, polyline, smoothing)
  if (!point || !powerCurve || !polyline || !smoothing) return []

  const firstIndex = Math.floor(powerCurve.points[point.x].index / smoothing)

  let secondIndex = firstIndex + Math.ceil((point.x) / smoothing)
  // console.log(firstIndex, secondIndex, polyline)
  if (secondIndex - firstIndex <= 2) secondIndex += 2
  setState(polyline.slice(firstIndex, secondIndex))
}

export async function getDataForPowerCurveAllTime (workoutPowerCurve) {
  // let workouts = await db.getAll('workouts');
  // let powerCurveMap = getPointForPowerCurve(workouts);
  // let powerCurveArray = [];
  // powerCurveMap.forEach((value, key, map) => {
  //   if (workoutPowerCurve.get(key))
  //     powerCurveArray.push([key, value.value]);
  // })
  // return [powerCurveArray, powerCurveMap]
}

export function getPointForPowerCurve (allWorkouts) {
  const powerCurveMap = new Map()
  allWorkouts.forEach(workout => {
    if (workout.sport === 'cycling' && workout.powerCurve) {
      workout.powerCurve.forEach((value, key, _) => {
        if (Number.isInteger(key) && Number.isInteger(value.value)) {
          if (powerCurveMap.has(key)) {
            if (value.value > powerCurveMap.get(key).value) {
              powerCurveMap.set(key, { value: value.value, id: workout.id, timestamp: workout.timestamp })
            }
          } else {
            powerCurveMap.set(key, { value: value.value, id: workout.id, timestamp: workout.timestamp })
          }
        }
      })
    }
  })
  return powerCurveMap
}
