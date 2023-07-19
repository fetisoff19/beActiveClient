import auth from './auth/auth.slice.js'
import settings from './settings/settings.slice.js'
import appEvents from './appEvents/appEvents.slice.js'
import workouts from './workouts/workouts.slice.js'

export const rootReducer = {
  user: auth,
  workouts,
  settings,
  app: appEvents
}
