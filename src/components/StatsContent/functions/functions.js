

export function getDataForStatsChart(workouts, timestampArray, formatter, field) {
  let data = new Array(timestampArray[0].length);
  let totalTimerTime = 0;
  let totalValue = 0;
  let avg = 0;
  for (let k = 0; k < data.length; k++) {
    data[k] = [];
  }

  for (let j = 0; j < workouts.length; j++) {
    let date = workouts[j].timestamp;
    let i = timestampArray[0]
      .findIndex((item, index, a) =>
        date >= item && (index === a.length - 1 || date < a[index + 1]))
    if (i >= 0) {

      data[i].push([workouts[j][field] || 0, workouts[j].totalTimerTime])
      let value = workouts[j][field] * workouts[j].totalTimerTime;

      if (value && formatter[field]?.convertAvg) {
        totalTimerTime += workouts[j].totalTimerTime;
        totalValue += value;
      }
    }
  }
  avg = totalValue / totalTimerTime;

  let yData = data.map(item =>
    Number.isFinite(formatter[field]?.convert(item))
    && formatter[field]?.convert(item) || null)

  if (formatter[field]?.type === 'maxValue') {
    avg = yData.reduce((sum, current) => sum + current, 0)
      / yData.reduce((sum, current) => current > 0 ? sum + 1 : sum, 0)
  }
  return [yData, avg, field]
}