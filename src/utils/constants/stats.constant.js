import {
  convertDistance,
  convertPace,
  convertPaceInMinute,
  convertSpeed,
  getHourMinSec
} from "@helpers/functionsDate&Values.helpers";

export const configMainStats = {
  totalDistance: {
    formatter: value => convertDistance(value).toString().replace('.', ','),
    unit: 'km',
    label: 'totalDistance',
  },
  totalTimerTime: {
    formatter: getHourMinSec,
    label: 'totalTimerTime',
  },
  enhancedAvgSpeed: {
    formatter: x => convertSpeed(x).toString().replace('.', ','),
    uniqueFormatter: convertPace,
    unit: 'kmph',
    uniqueUnit: 'pace',
    uniqueSport: ['running', 'walking', 'hiking'],
    // uniqueSport: 'running',
    label: 'avgSpeed',
    uniqueLabel: 'avgPace',
  },
  totalAscent: {
    unit: 'm',
    label: 'totalAscent',
  },
  avgHeartRate: {
    unit: 'bpm',
    label: 'avgHeartRate',
  },
  maxHeartRate: {
    unit: 'bpm',
    label: 'maxHeartRate',
  },
  avgPower: {
    unit: 'w',
    label: 'avgPower',
  },
}


export const statsFields = {
  heartRate: {
    fields: [
      'maxHeartRate',
      'avgHeartRate',
    ],
    unit: 'bpm',
  },
  speed: {
    fields: [
      'maxSpeed',
      'avgSpeed',
    ],
    formatter: x => convertSpeed(x).toString().replace('.', ','),
    unit: 'kmph',
  },
  pace: {
    fields: [
      'enhancedMaxSpeed',
      'enhancedAvgSpeed',
    ],
    unit: 'pace',
    formatter: convertPace,
  },
  power: {
    fields: [
      'maxPower',
      'normalizedPower',
      'avgPower',
    ],
    unit: 'w',
  },
  time: {
    fields: [
      'totalTimerTime',
      'totalElapsedTime',
      'startTime',
      'timestamp',
    ],
    formatter: getHourMinSec,
    unit: null,
  },
  cadenceRun: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    unit: 'cadenceRun',
  },
  cadence: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    unit: 'cadenceCycling',
  },
  altitude: {
    fields: [
      'totalAscent',
      'totalDescent',
      'maxAltitude',
      'minAltitude',
    ],
    unit: 'm',
  },
  temperature: {
    fields: [
      'maxTemperature',
      'avgTemperature',
    ],
    unit: 'degreeCelsius',
  },
  other: {
    fields: [
      'totalStrides',
      'trainingStressScore',
      'totalCalories',
    ],
    unit: null,
  }
}


export const statsConfig = {
  totalWorkouts: {
    name: 'totalWorkouts',
    convert: x => x.length,
    chartsType: 'column',
    color: '#2f9a9a',
  },
  totalTimerTime: {
    unit: 'min',
    name: 'totalElapsedTime',
    convert: x => Math.round(x.reduce((sum, current) => (sum + +current[0]), 0) / 60),
    chartsType: 'column',
    color: '#8a8585'
  },
  totalDistance: {
    formatter: x => convertDistance(x),
    unit: 'km',
    name: 'totalDistance',
    convert: x => convertDistance(x.reduce((sum, current) => (sum + +current[0]), 0)),
    chartsType: 'column',
    color: 'green'
  },
  avgSpeed: {
    unit: 'kmph',
    name: 'avgSpeed',
    convert: x => convertSpeed(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    chartsType: 'spline',
    avg: x => convertSpeed(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    convertAvg: convertSpeed,
    color: '#11a9ed',
  },
  enhancedAvgSpeed: {
    unit: 'pace',
    name: 'avgPace',
    convert: x =>
      convertPaceInMinute(
        x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
        /
        x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0),
    yAxisFormatter: convertPaceInMinute,
    chartsType: 'spline',
    convertAvg: convertPace,
    color: '#11a9ed',
  },
  avgHeartRate: {
    unit: 'bpm',
    name: 'avgHeartRate',
    convert: x =>
      Math.round(
        x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
        /
        x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0),
    chartsType: 'spline',
    convertAvg: Math.round,
    color: '#ff0035',
  },
  maxHeartRate: {
    unit: 'bpm',
    name: 'maxHeartRate',
    convert: x => Math.round(x.reduce((sum, current) => Math.max(sum, +current[0]), 0)),
    chartsType: 'spline',
    convertAvg: Math.round,
    type: 'maxValue',
    color: '#83031f',
  },
  avgPower: {
    unit: 'w',
    name: 'avgPower',
    convert: x => Math.round(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    chartsType: 'spline',
    convertAvg: Math.round,
    color: '#6bc531',
  },
  avgCadence: {
    unit: 'cadence',
    name: 'avgCadence',
    convert: x => Math.round(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    chartsType: 'spline',
    convertAvg: Math.round,
    color: '#c74cb1',
  },
  totalAscent: {
    unit: 'm',
    name: 'totalAscent',
    convert: x => Math.round(x.reduce((sum, current) => (sum + +current[0]), 0)),
    chartsType: 'column',
    color: '#750bc4',
  },
  totalCalories: {
    name: 'totalCalories',
    convert: x => Math.round(x.reduce((sum, current) => (sum + +current[0]), 0)),
    chartsType: 'column',
    color: '#c47237',
  },
}