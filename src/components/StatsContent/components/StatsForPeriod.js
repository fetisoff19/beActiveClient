import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import WorkoutsNotFound from "../../WorkoutsList/components/WorkoutsNotFound";
import StatsCharts from "./StatsCharts";
import {dictConstant, userLang} from "@constants/dict.constant.js";
import {calcDate, dayInMs,} from "@helpers/functionsDate&Values.helpers";
import IndicatorsList from "./IndicatorsList";
import styles from '../styles.module.scss'
import {getDataForStatsChart} from "@helpers/stats.helpers";
import Highcharts from 'highcharts'
import AddSeriesList from "./AddSeriesList";
import {statsConfig} from "@constants/stats.constant";


const StatsForPeriod = ({startDate, endDate, period, customPeriod}) => {
  const [field, setField] = useState('totalWorkouts');
  const workouts = useSelector(state => state.workouts.workouts);
  const workoutsLength = useSelector(state => state.workouts.workouts?.length);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [seriesNames, setSeriesNames] = useState([]);


  const timestampArray = useMemo(() =>
    calcDate(startDate, endDate, period, customPeriod) , [startDate, endDate, customPeriod, period]);

  const data = useMemo(() => {
      if (workouts?.length > 0 && timestampArray) {
        let result = getDataForStatsChart(workouts, timestampArray, statsConfig, field);
        setXData(timestampArray[1])
        setYData(result)
        return [timestampArray, result]
      }
    },
    [workouts, field])


  const charts = useMemo(() => {
      if(yData?.length) return (
        <StatsCharts
          name={yData[2]}
          xData={xData}
          yData={yData}
          convertAvg={statsConfig[field]?.convertAvg}
          yAxisFormatter={statsConfig[field]?.yAxisFormatter}
          type={statsConfig[field]?.chartsType}
          days={(endDate - startDate) / dayInMs}
          customPeriod={customPeriod}
          style={{height: 400, width: 1000}}/>
      )

    }
    , [xData, yData])


  useEffect(() => {
    return () => {
      while (Highcharts.charts.length > 0) {
        Highcharts.charts.pop();
      }
    }
  }, [])


  if(workouts?.length) {
    return (
      <div className={styles.listChartsTable}>
        <IndicatorsList field={field} setField={setField}/>
        <div>
          <h3>
            {dictConstant.fields[statsConfig[field].name][userLang]}
            <AddSeriesList
              field={field} workouts={workouts} data={data}
              seriesNames={seriesNames} setSeriesNames={setSeriesNames}/>
          </h3>
          {charts}
        </div>
      </div>
    );
  } else if(workoutsLength === 0) return (
    <WorkoutsNotFound styles={styles}/>
  )
};

export default StatsForPeriod;