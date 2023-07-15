import React, {useContext, useState} from 'react';
import {dictConstant, userLang} from "@constants/dict.constant.js";
import {useSelector} from "react-redux";
import styles from '../styles.modules.scss'
import Input from "../../UI/Input";
import X from "../../UI/svgComponents/X";
import WorkoutsListContext from "../context/Context";
import SportsFilter from "../../UI/SportsFilter";


const FilterBar = () => {
  const {sport, setSport, setPage,
    setDirection, setChosenField,
    search, setSearch} = useContext(WorkoutsListContext);
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const loader = useSelector(state => state.app.appLoader);
  const numberOfFiles = useSelector(state => state.workouts.numberOfFiles);


  function searchChangeHandler(value) {
    setSearchName(value)
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }
    if(searchName !== '') {
      setPage(1)
      setSearch(value)
      setSearchTimeout(setTimeout((value) => {
        setSearch(value)
      }, 800,value))
    } else {
      setSearch('')
    }
  }

  function stopSearch(){
    setPage(1)
    setSearch('')
    setSearchName('')
  }

  function handleClick(item) {
    setSearch('')
    setSearchName('')
    setPage(1)
    setSport(item)
    setDirection(-1)
    setChosenField('timestamp')
  }



  return (
    <div className={styles.filterBar}>
      <div className={styles.inputResult}>
        <div className={styles.searchInput}>
          <Input
            setValue={searchChangeHandler}
            value={searchName}
            id={'searchWorkoutName'}
            type="text"
            minLength="2"
            classname={''}
            placeholder={dictConstant.title.searchWorkouts[userLang]}
          />
          {searchName && <div onClick={stopSearch}>
            <X/>
          </div>}
        </div>
        {search && !loader &&
          <div>
          {dictConstant.title.resultSearch1[userLang] + numberOfFiles
            + dictConstant.title.resultSearch2[userLang] + search}
          </div>}
      </div>
      <SportsFilter
        sport={sport}
        onClick={handleClick}
        styles={styles}/>
    </div>
  );
};

export default FilterBar;