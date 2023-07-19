export function getDataForStatsChart (workouts, timestampArray, formatter, field) {
  const data = []
  let totalTimerTime = 0
  let totalValue = 0
  let avg
  for (let k = 0; k < timestampArray[0].length; k++) {
    data[k] = []
  }

  for (let j = 0; j < workouts.length; j++) {
    const date = workouts[j].timestamp
    const i = timestampArray[0]
      .findIndex((item, index, a) =>
        date >= item && (index === a.length - 1 || date < a[index + 1]))
    if (i >= 0) {
      data[i].push([workouts[j][field] || 0, workouts[j].totalTimerTime])
      const value = workouts[j][field] * workouts[j].totalTimerTime

      if (value && formatter[field]?.convertAvg) {
        totalTimerTime += workouts[j].totalTimerTime
        totalValue += value
      }
    }
  }
  avg = totalValue / totalTimerTime

  const yData = data.map(item => {
    if (!Number.isFinite(formatter[field]?.convert(item))) {
      return null
    } else {
      return formatter[field]?.convert(item)
    }
  })

  if (formatter[field]?.type === 'maxValue') {
    avg = yData.reduce((sum, current) => sum + current, 0) /
      yData.reduce((sum, current) => current > 0 ? sum + 1 : sum, 0)
  }

  return [yData, avg, field]
}
