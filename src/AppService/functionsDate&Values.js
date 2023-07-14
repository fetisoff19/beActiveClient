// export function formatDateForInput(dateObj) {
// 		 return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000 ))
// 				.toISOString()
// 				.split("T")[0];
// }
//
// function formatDateTimeForInput(dateObj) {
// 		return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000 ))
// 				.toISOString()
// 				.split("Z")[0];
// }
//
// function getDateOfISOWeek(yearAndWeek) {
//   //получает номер и год (2020-W06), возвращает дату начала недели
// 	let w = yearAndWeek.substring(6,8);
// 	let y = yearAndWeek.substring(0,4);
// 	let simple = new Date(y, 0, 1 + (w - 1) * 7);
//     let dow = simple.getDay();
//     let ISOweekStart = simple;
//     if (dow <= 4)
//       ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
//     else
//       ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
//     return ISOweekStart;
// }
//
// function getLastDayOfPeriod(firstDay, period) {
// 		let getLD = plusPeriod(period);
// 		let LD = getLD((new Date(firstDay)));
// 		LD.setDate(LD.getDate() - 1);
// 		return LD;
// }
//
// function getFirstDayOfPeriod(date, period) {
// 		let FD;
// 		switch (period) {
// 				case 'День' :
// 				case 'D' :
// 						FD = new Date(date);
// 						break;
// 				case 'Неделя' :
// 				case 'W' :
// 						let weekNum = getWeekNum(date);
// 						let dayNum = date.getDate();
// 						let weekBelongsToPreviousYear = (weekNum > 51 && dayNum < 7);
// 						let year = weekBelongsToPreviousYear ? date.getFullYear()-1 : date.getFullYear();
// 						FD = getDateOfISOWeek(year + '-W' + weekNum);
// 						break;
// 				case 'Месяц' :
// 				case 'M' :
// 						FD = new Date(date);
// 						FD.setDate(1);
// 						break;
// 				case 'Квартал' :
// 				case 'Q' :
// 						let quarter = Math.floor((date.getMonth() / 3));
// 						FD = new Date(date.getFullYear(), quarter * 3, 1);
// 						break;
// 				case 'Полгода' :
// 				case 'HY' :
// 						let fdMonth = date.getMonth()>5 ? 6 : 0;
// 						FD = new Date(date.getFullYear(), fdMonth, 1);
// 						break;
// 				case 'Год' :
// 				case 'Y' :
// 						FD = new Date(date.getFullYear(), 0, 1);
// 		}
// 		return FD;
// }
//
// function getWeekNum(date) {
// 		let d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
// 		let dayNum = d.getUTCDay() || 7;
// 		d.setUTCDate(d.getUTCDate() + 4 - dayNum);
// 		let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
// 		return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
// }

export function getDataForInputDate(ms){
  // console.log(new Date(ms).toJSON().split('T').shift(), new Date(ms).toLocaleString().split(',').shift().split('.').reverse().join('-'))
  return new Date(ms).toLocaleString().split(',').shift().split('.').reverse().join('-')
  // return new Date(ms).toJSON().split('T').shift()
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

