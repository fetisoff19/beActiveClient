import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@components/../AppRouter/AppRouter.jsx'
import './global.scss'
import { Provider } from 'react-redux'
import { store } from '@store'

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
