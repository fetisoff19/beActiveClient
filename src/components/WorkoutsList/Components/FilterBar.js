import React, {useContext, useState} from 'react';
import {dict, userLang} from "../../../config/config";
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
            placeholder={dict.title.searchWorkouts[userLang]}
          />
          {searchName && <div onClick={stopSearch}>
            <X/>
          </div>}
        </div>
        {search && !loader &&
          <div>
          {dict.title.resultSearch1[userLang] + numberOfFiles
            + dict.title.resultSearch2[userLang] + search}
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