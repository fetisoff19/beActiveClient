import React from 'react';
import Highcharts, {chart} from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Exporting from 'highcharts/modules/exporting';
import {dict, statsConfig, userLang} from "../../../config/config";


Exporting(Highcharts);

const StatsCharts = ({name, xData, yData, days, convertAvg, yAxisFormatter, customPeriod, type, style}) => {
  const avg = yData[1];
  const unit = field => statsConfig[field]?.unit
    ? dict.units[statsConfig[field]?.unit][userLang]
    : '';
  const plotLines = convertAvg &&
    (dict.title.avg[userLang] + ': '
      + convertAvg(avg).toString().replaceAll('.', ',')
      + ' ' + unit(name));

  function xAxisFormatter(x){
   if(customPeriod && days > 750) {
     return (
     `${x.getFullYear()}`
     )
    }
    else if((!customPeriod && days > 100) || (customPeriod && days > 180)) {
      return (
        dict.monthStrict[x.getMonth()][userLang]
        + (x.getMonth() === 0 ? (xData.length > 12 ? ` ${x.getFullYear()}` : `<br>${x.getFullYear()}`) : '')
      )
    } else {
      return (
        x.getDate() + ' ' + dict.month[x.getMonth()][userLang]
      )
    }
  };

  function tooltipFormatter(x, y, id){
    if(y > 0) {
      y = statsConfig[id]?.yAxisFormatter
        ? statsConfig[id]?.convertAvg(statsConfig[id]?.yAxisFormatter(y))
        : y.toString().replaceAll('.', ',')
      return (
        `<b>${xAxisFormatter(x)}</b><br>${dict.fields[id][userLang]}: ${y} ${unit(id)}`
      )
    }
  }


  const options = {
    chart: {
      type: type || 'line',
      height: style.height,
      width: style.width,

    },
    title: {
      text: null,
    },
    xAxis: {
      categories: xData,
      labels: {
        formatter: function () {
          return xAxisFormatter(this.value);
        },
      },
    },
    yAxis: {
      labels:{
        style: {
          color: statsConfig[name]?.color,
        },
      },
      title: {
        text: ''
      },
      id: name,
      min: 0,
      minTickInterval: 1,
      plotLines: avg && [{
        color: '#383838',
        width: 1,
        value: yAxisFormatter ? yAxisFormatter(avg) : convertAvg ? convertAvg(avg) : avg,
        dashStyle: 'shortdash',
        label: {
          text: plotLines,
          align: 'right',
          x: - 5,
          y: 15,
          style:{
            fontWeight: 'bold',
            color: '#383838',
            textShadow: 'white 0 0 10px',
          }
        },
        zIndex: 4,
      }],
    },
    series: [{
      name: dict.fields[name][userLang] + (unit(name) ? (', ' + unit(name)) : ''),
      data: yData[0],
      color: statsConfig[name]?.color || 'brown',
      id: name,
      zIndex: type === 'column' ? 1 : 2,
    }],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      },
      series: {
        marker: {
          radius: 5
        }
      }
    },

    tooltip: {
      formatter: function (){
        return tooltipFormatter(this.x, this.y, this.series.userOptions.id);
      },
    },
    navigation: {
      buttonOptions: {
        verticalAlign: 'bottom',
        y: -5,
        x: 0,
      }
    },
  }

  return (
    <div key={Date.now()}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        allowChartUpdate={false}
      />
    </div>
  );
};

export default StatsCharts;