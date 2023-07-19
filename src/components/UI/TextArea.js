import React, { useEffect, useRef, useState } from 'react'
import { dictConstant, userLang } from '@constants/dict.constant.js'
import Ok from '../Svg/Ok'
import Close from '../Svg/Close'
import { editWorkout } from '@store/workouts/workouts.actions'
import { useDispatch, useSelector } from 'react-redux'
import AppLoader from '../Loaders/AppLoader'

const TextArea = ({ text, _id, styles, setState }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(text || dictConstant.title.placeholderNote[userLang])
  const [showButtons, setShowButtons] = useState(false)
  const ref = useRef(null)
  const filesToDelete = useSelector(state => state.workouts.filesToDelete)
  const smallLoaderId = useSelector(state => state.app.smallLoaderId)

  useEffect(() => autoGrow(ref.current), [value])

  const handleChange = e => {
    setValue(e.target.value)
  }

  function saveNote () {
    if (value && value !== text && value !== dictConstant.title.placeholderNote[userLang]) {
      dispatch(editWorkout(_id, 'note', value))
    }
    setShowButtons(false)
  }

  function autoGrow (element) {
    element.style.height = '15px'
    element.style.height = (element.scrollHeight) + 'px'
  }

  return (
    <div className={styles?.note}>
      <textarea
        ref={ref} id={'about' + _id}
        minLength="10" maxLength="300"
        // placeholder={value}
        value={value}
        onChange={handleChange}
        onFocus={() => {
          setState && setState(true)
          setShowButtons(true)
          value === dictConstant.title.placeholderNote[userLang] ? setValue('') : null
        }}
        onBlur={() => {
          setState && setState(false)
          // setShowButtons(false);
          !value ? setValue(text || dictConstant.title.placeholderNote[userLang]) : null
        }}
      />
      {showButtons &&
        <div className={styles?.buttons}>
          <div className={styles?.ok} onClick={saveNote}>
            <Ok fill={'grey'}/>
          </div>
          <div className={styles?.close} onClick={() => {
            setShowButtons(false)
            setValue(text || dictConstant.title.placeholderNote[userLang])
            ref.current.value = text || dictConstant.title.placeholderNote[userLang]
          }}
          >
            <Close fill={'grey'}/>
          </div>
        </div>}
      {smallLoaderId.includes(_id) && !filesToDelete.includes(_id) &&
        <AppLoader height={'20'} width={'20'} cursorWait={true}/>}
    </div>
  )
}

export default React.memo(TextArea)
