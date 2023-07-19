import { createSlice } from '@reduxjs/toolkit'

const appEventsSlice = createSlice({
  name: 'appEvents',
  initialState: {
    appLoader: false,
    smallLoader: false,
    smallLoaderId: [],
    modal: false,
    cursorWait: false,
    error: null,
    requestGetWorkouts: false
  },
  reducers: {
    showLoader (state) {
      state.appLoader = true
    },
    hideLoader (state) {
      state.appLoader = false
    },
    setError (state, action) {
      state.error = action.payload
    },
    showSmallLoader (state, action) {
      if (action.payload) {
        state.smallLoaderId = [...state.smallLoaderId, action.payload]
      }
      state.smallLoader = true
    },
    hideSmallLoader (state, action) {
      if (action.payload) {
        state.smallLoaderId = state.smallLoaderId.filter(id => id !== action.payload)
      }
      state.smallLoader = false
    },
    cursorWaitOn (state) {
      state.cursorWait = true
    },
    cursorWaitOff (state) {
      state.cursorWait = false
    },
    setRequestGetWorkouts (state) {
      state.requestGetWorkouts = true
    },
    removeRequestGetWorkouts (state) {
      state.requestGetWorkouts = false
    },
    showModal (state) {
      state.modal = true
    },
    hideModal (state) {
      state.modal = false
    }
  }
})

export default appEventsSlice.reducer

export const {
  showLoader, hideLoader, setError,
  showSmallLoader, hideSmallLoader,
  cursorWaitOn, cursorWaitOff,
  showModal, hideModal,
  setRequestGetWorkouts, removeRequestGetWorkouts
} = appEventsSlice.actions
