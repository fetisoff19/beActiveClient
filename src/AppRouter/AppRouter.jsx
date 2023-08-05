import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '@/routes'
import Main from '@components/Main/Main.jsx'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const AppRouter = () => {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    isAuth
      ? (
      <Routes>
        <Route path={'/'} element={<Main/>}>
          {privateRoutes.map(route =>
            <Route
              path={route?.path}
              element={route?.navigate ? <Navigate to='/'/> : <route.element/>}
              index={route?.index}
              key={route.path || route?.index}
            />)}
        </Route>
      </Routes>
        )
      : (
      <Routes>
        <Route path={'/'} element={<Main/>}>
          {publicRoutes.map(route =>
            <Route
              path={route.path}
              element={route?.navigate ? <Navigate to='/'/> : <route.element/>}
              index={route?.index}
              key={route.path || route?.index}
            />)}
        </Route>
      </Routes>
        )
  )
}

export default AppRouter
