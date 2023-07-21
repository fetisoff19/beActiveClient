export function getDataForInputDate (ms) {
  return new Date(ms).toLocaleString().split(',').shift().split('.').reverse().join('-')
}

export function getMinSec (minutes) {
  const min = Math.floor(minutes)
  let sec = Math.round((minutes - min) * 60)
  if (sec === 0) sec = '00'
  else if (sec < 10) sec = '0' + sec
  return min + ':' + sec
}

export function getHourMinSec (timestamp) {
  if (typeof timestamp === 'object' || timestamp > 10 ** 6) {
    return new Date(timestamp).toLocaleTimeString('it-IT')
  } else if (typeof timestamp === 'number') {
    const hours = Math.floor(timestamp / 3600)
    const minutes = Math.floor(timestamp / 60) - (hours * 60)
    const seconds = Math.round(timestamp % 60)

    let formatted = ''
    if (hours) {
      formatted = [
        hours.toString(),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':')
    } else {
      formatted = [
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':')
    }
    return formatted
  } else return timestamp
}

export const dayInMs = 8.64 * (10 ** 7)
export const convertSpeed = value => +(value * 3.6).toFixed(1)
export const convertPace = value => getMinSec((60 / (3.6 * value)).toFixed(2))
export const convertSpeedToPace = value =>
  (Math.floor(value) + ',' + ((value - Math.floor(value)) * 60).toFixed())
export const convertPaceInMinute = value => +(60 / (3.6 * value)).toFixed(2)
export const doubleValue = value => Math.round(value * 2)
export const convertDistance = value => +(value / 1000).toFixed(2)

export function calcDate (firstDay, lastDay, period, customPeriod) {
  const year = new Date(firstDay).getFullYear()
  const month = new Date(firstDay).getMonth()
  const days = (lastDay - firstDay) / dayInMs

  if (customPeriod) {
    if (days > 750) {
      return CalcDateService.more750Days(firstDay, days, year)
    }
    if (days > 180) {
      return CalcDateService.daysOver180(firstDay, month, days)
    }
    if (days > 28) {
      return CalcDateService.more28Days(firstDay, days)
    } else return CalcDateService.less28days(firstDay, days)
  }
  if (period === '365' || period === '180') {
    return CalcDateService.period365or180Days(firstDay, month, period)
  }
  if (period === '28') {
    return CalcDateService.period28Days(firstDay)
  }
  if (period === '7') {
    return CalcDateService.period7Days(firstDay)
  }
}

class CalcDateService {
  static more750Days (firstDay, days, year) {
    const result = [[], []]
    for (let i = 0; i < days / 365; i++) {
      const date = i === 0
        ? new Date(firstDay)
        : new Date(year + i, 0, 1)
      result[0].push(date)
      result[1].push(new Date(date))
    }
    return [...result]
  }

  static daysOver180 (firstDay, month, days) {
    const result = [[], []]
    for (let i = 0; i < days / 30.4; i++) {
      const day = i === 0 ? new Date(firstDay).getDate() : 1
      result[0].push(new Date(firstDay).setMonth(month + i, day))
      result[1].push(new Date(new Date(firstDay).setMonth(month + i, day)))
    }
    return [...result]
  }

  static more28Days (firstDay, days) {
    const result = [[], []]
    for (let i = 0; i < days / 7; i++) {
      result[0].push(firstDay + i * 7 * dayInMs)
      result[1].push(new Date(firstDay + i * 7 * dayInMs))
    }
    return [...result]
  }

  static less28days (firstDay, days) {
    const result = [[], []]
    for (let i = 0; i < days; i++) {
      result[0].push(firstDay + i * dayInMs)
      result[1].push(new Date(firstDay + i * dayInMs))
    }
    return [...result]
  }

  static period365or180Days (firstDay, month, period) {
    const result = [[], []]
    const numberOfMonths = period === '365' ? 12 : 6
    for (let i = 0; i < numberOfMonths; i++) {
      result[0].push(new Date(firstDay).setMonth(month + i, 1))
      result[1].push(new Date(new Date(firstDay).setMonth(month + i, 1)))
    }
    return [...result]
  }

  static period28Days (firstDay) {
    const result = [[], []]
    for (let i = 0; i < 4; i++) {
      result[0].push(firstDay + i * 7 * dayInMs)
      result[1].push(new Date(firstDay + i * 7 * dayInMs))
    }
    return [...result]
  }

  static period7Days (firstDay) {
    const result = [[], []]
    for (let i = 0; i < 7; i++) {
      result[0].push(firstDay + i * dayInMs)
      result[1].push(new Date(firstDay + i * dayInMs))
    }
    return [...result]
  }
}
