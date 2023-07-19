import { getHourMinSec } from '@helpers/functionsDate&Values.helpers'
import { dictConstant, userLang } from '@constants/dict.constant.js'

export const chartsConfig = {
  speed: {
    title: 'speed',
    plotLinesText: 'avgSpeed',
    plotLinesTextValue: 'kmph',
    lineColor: '#11a9ed',
    themeColor: '#11a9ed',
    reversed: false

  },
  pace: {
    title: 'pace',
    plotLinesText: 'avgPace',
    plotLinesTextValue: 'pace',
    lineColor: 'white',
    themeColor: '#11a9ed',
    reversed: true
  },
  power: {
    title: 'power',
    plotLinesText: 'avgPower',
    plotLinesTextValue: 'w',
    lineColor: '#6bc531',
    themeColor: '#6bc531',
    reversed: false
  },
  heartRate: {
    title: 'heartRate',
    plotLinesText: 'avgHeartRate',
    plotLinesTextValue: 'bpm',
    lineColor: '#ff0035',
    themeColor: '#ff0035',
    reversed: false
  },
  cadence: {
    title: 'cadence',
    plotLinesText: 'avgCadence',
    plotLinesTextValue: 'cadenceCycling',
    plotLinesTextValueRunning: 'cadenceRun',
    lineColor: '#c74cb1',
    themeColor: '#c74cb1',
    reversed: false
  },
  altitude: {
    title: 'altitude',
    plotLinesText: 'avgAltitude',
    plotLinesTextValue: 'm',
    lineColor: '#750bc4',
    themeColor: '#750bc4',
    reversed: false
  },
  powerCurve: {
    title: 'powerCurve',
    plotLinesTextValue: 'w',
    lineColor: '#02afaf',
    themeColor: '#02afaf',
    reversed: false,
    formatter: function (x, y) {
      if (x < 60) return `${x}${dictConstant.units.s[userLang]}<br>${y} ${dictConstant.units.w[userLang]}`
      else {
        x = getHourMinSec(x)
        return `${x}<br>${y}${dictConstant.units.w[userLang]}`
      }
    },
    options: {
      xAxis: {
        tickWidth: 1,
        tickLength: 0,
        minorTickPosition: 'outside',
        showFirstLabel: true,
        labels: {
          formatter: function () {
            if (this.value < 60) return this.value + dictConstant.units.s[userLang]
            else return getHourMinSec(this.value)
          },
          enabled: true,
          y: 12
        },
        min: 1
      }
    }
  },
  powerCurveAllTime: {
    title: 'powerCurve',
    plotLinesTextValue: 'w',
    lineColor: 'rgb(90,90,90)',
    themeColor: 'rgb(90,90,90)',
    reversed: false
  }
  // totalTimerTime: {
  //   name: 'totalTimerTime',
  //   // plotLinesText: 'avgAltitude',
  //   // plotLinesTextValue: 'm',
  //   lineColor: '#750bc4',
  //   themeColor: '#750bc4',
  //   reversed: false,
  // }
}
