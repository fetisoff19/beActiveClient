export function getDataForInputDate(ms){
  return new Date(ms).toLocaleString().split(',').shift().split('.').reverse().join('-')
}



export function getMinSec(minutes) {
  let min = Math.floor(minutes);
  let sec = Math.round((minutes - min) * 60);
  if (sec === 0) sec = '00';
  else if (sec < 10) sec = '0' + sec;
  return min + ':' + sec
}

export function getHourMinSec(timestamp) {
  if (typeof timestamp == "object" || timestamp > 10**6) {
    return new Date(timestamp).toLocaleTimeString('it-IT');
  }
  else if (typeof timestamp == "number") {
    let hours = Math.floor(timestamp / 3600);
    let minutes = Math.floor(timestamp / 60) - (hours * 60);
    let seconds = Math.round(timestamp % 60);

    let formatted = '';
    if (hours)
      formatted = [
        hours.toString(),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
      ].join(':');

    else formatted = [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
    return formatted;
  } else return timestamp
}


export const dayInMs = 8.64 * (10 ** 7);
export let convertSpeed = value =>  +(value * 3.6).toFixed(1);
export let convertPace = value => getMinSec((60/(3.6 * value)).toFixed(2));
export let convertSpeedToPace = value =>
  (Math.floor(value) + ',' + ((value - Math.floor(value)) * 60).toFixed());
export let convertPaceInMinute = value => +(60/(3.6 * value)).toFixed(2);
export let doubleValue = value =>  Math.round(value * 2);
export let convertDistance = value =>  +(value / 1000).toFixed(2);

export function calcDate(firstDay, lastDay, period, customPeriod) {
  const timestampArray = [];
  const dateArray = [];
  const year = new Date(firstDay).getFullYear();
  const month = new Date(firstDay).getMonth();
  let days = (lastDay - firstDay) / dayInMs;

  if(customPeriod){

    if(days > 750){
      for (let i = 0; i < days / 365; i++){
        let date = i === 0
          ? new Date(firstDay)
          : new Date(year + i, 0, 1);
        dateArray.push(new Date(date))
        timestampArray.push(date)
      }
    }
    else if(days > 180){
      for (let i = 0; i < days / 30.4; i++){
        let day = i === 0 ? new Date(firstDay).getDate() :  1;
        dateArray.push(new Date(new Date(firstDay).setMonth(month + i, day)))
        timestampArray.push(new Date(firstDay).setMonth(month + i, day))
      }
    }else if(days > 28){
      for (let i = 0; i < days / 7; i++){
        dateArray.push(new Date(firstDay + i * 7 * dayInMs))
        timestampArray.push(firstDay + i * 7 * dayInMs)
      }
    } else {
      for (let i = 0; i < days; i++){
        dateArray.push(new Date(firstDay + i * dayInMs))
        timestampArray.push(firstDay + i * dayInMs)
      }
    }

  }
  else if(period === '365'){
    for (let i = 0; i < 12; i++){
      dateArray.push(new Date(new Date(firstDay).setMonth(month + i,1)))
      timestampArray.push(new Date(firstDay).setMonth(month + i,1))
    }
  }
  else if(period === '180'){
    for (let i = 0; i < 6; i++){
      dateArray.push(new Date(new Date(firstDay).setMonth(month + i,1)))
      timestampArray.push(new Date(firstDay).setMonth(month + i,1))
    }
  }
  else if(period === '28'){
    for (let i = 0; i < 4; i++){
      dateArray.push(new Date(firstDay + i * 7 * dayInMs))
      timestampArray.push(firstDay + i * 7 * dayInMs)
    }
  }
  else if(period === '7'){
    for (let i = 0; i < 7; i++){
      dateArray.push(new Date(firstDay + i * dayInMs))
      timestampArray.push(firstDay + i * dayInMs)
    }
  }

  return [timestampArray, dateArray]
}

