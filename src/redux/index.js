import userReducer from "./reducers/userReducer.js";
import settingsSlice from "./reducers/settingsReducer.js"
import appReducer from "./reducers/appReducer.js";
import {configureStore} from "@reduxjs/toolkit";
import workoutsSlice from './reducers/workoutsReducer.js'
// import workoutsListReducer from "./reducers/workoutsListReducer.js";

const rootReducer = {
  user: userReducer,
  workouts: workoutsSlice,
  settings: settingsSlice,
  app: appReducer,
  // workoutsList: workoutsListReducer
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,       // исходные файлы включают в себя объекты timestamp
    }),
})