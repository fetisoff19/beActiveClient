import React, {useEffect, useState} from 'react';
import styles from "../styles.module.scss";
import {dictConstant, userLang} from "@constants/dict.constant.js";
import Highcharts from "highcharts";
import {getDataForStatsChart} from "@helpers/stats.helpers";
import Plus from "../../UI/svgComponents/Plus";
import Minus from "../../UI/svgComponents/Minus";
import {statsConfig} from "@constants/stats.constant";

const indicators = ['totalWorkouts', 'totalTimerTime', 'totalDistance', 'avgHeartRate', 'avgSpeed', 'enhancedAvgSpeed', 'avgPower', 'maxHeartRate',  'totalAscent',  'avgCadence', 'totalCalories']


const AddSeriesList = ({seriesNames, setSeriesNames, field, workouts, data}) => {
  const [visibleList, setVisibleList] = useState(false)
  const [state, setState] = useState([]);

  const list = indicators.map(item =>
    field !== item &&
    <li
      key={item}
      className={seriesNames.includes(item) ? styles.selected : ''}
      onClick={() => handleClickList(item)}>
      {dictConstant.fields[item][userLang]}
    </li>
  )


  function handleClickList(item) {
    let chart = Highcharts.charts.at(-1)
    if(seriesNames.includes(item)) {
      setSeriesNames(prev => prev.filter(elem => elem !== item));
      setState(prev => prev.filter(elem => elem[2] !== item));
      chart.get(item)?.remove()
    } else {
      setSeriesNames(prev => [...prev, item])
      setState(prev => [...prev, getDataForStatsChart(workouts, data[0], statsConfig, item)]);
    }
  }

  function handleClickPlus() {
    setVisibleList(prev => !prev)
  }


  useEffect(() => {
    setState([]);
    setSeriesNames([]);
    visibleList && setVisibleList(false);
  }, [workouts])

  useEffect(() => {
    let chart = Highcharts.charts.at(-1)
    if(chart && state.length) {
      state.forEach(item => {
        if(!chart.get(item[2])) {
          let field = item[2]
          let data = {
            yData: item[0],
            avg: item[1],
            field: field,
            type: statsConfig[field]?.chartsType,
            color: statsConfig[field]?.color,
            nameSeries: dictConstant.fields[field][userLang],
            convertAvg: statsConfig[field]?.convertAvg,
            yAxisFormatter: statsConfig[field]?.yAxisFormatter,
            unit: statsConfig[field]?.unit
              ? dictConstant.units[statsConfig[field]?.unit][userLang]
              : '',
          }
          chart.addAxis({
            id: data.field,
            title: {
              text: null,
            },
            opposite: true,
            labels: {
              style: {
                color: statsConfig[field]?.color,
              },
            },

          });

          chart.addSeries({
            name: dictConstant.fields[data.field][userLang] + (data?.unit ? (', ' + data.unit) : ''),
            id: data.field,
            type: data.type,
            color: data.color,
            yAxis: data.field,
            data: data.yData,
            zIndex: data.type === 'column' ? 1 : 2
          });
        }
      })
    }
  }, [state, field])



  return (
    <div
      className={styles.addSeries + (visibleList ? (' ' + styles.svgRed) : '')}>
      <div onClick={handleClickPlus}>
        {visibleList
          ? <Minus height={'24px'} width={'24px'}/>
          : <Plus height={'24px'} width={'24px'}/>
        }
      </div>

      <div className={styles.list}>
        {visibleList &&
          <ul>
            {list}
          </ul>
        }
      </div>
    </div>
  );
};

export default AddSeriesList;