import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
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

export default userSlice.reducer;
export const {setUser, logout,  setDemo} = userSlice.actions;
