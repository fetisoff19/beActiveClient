import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    isAuth: !!localStorage.getItem('token'),
    demo: false,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout(state){
      localStorage.removeItem('token')
      state.currentUser = {};
      state.isAuth = false;
      state.demo = false;
    },
    setDemo(state){
      state.demo = true;
    },
  }
})

export default authSlice.reducer;
export const {setUser, logout,  setDemo} = authSlice.actions;
