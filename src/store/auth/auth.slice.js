import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    isAuth: !!localStorage.getItem('token'),
    demo: false
  },
  reducers: {
    setUser (state, action) {
      state.currentUser = action.payload
    },
    logout (state) {
      localStorage.removeItem('token')
      state.currentUser = {}
      state.demo = false
    },
    setDemo (state) {
      state.demo = true
    },
    setAuth (state, action) {
      state.isAuth = action.payload
    }
  }
})

export default auth.reducer
export const { setUser, logout, setDemo, setAuth } = auth.actions
