import React, { Suspense, useEffect } from 'react'
import Navbar from '../Navbar/Navbar.js'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../../pages/Error'
import { auth } from '@store/auth/auth.actions'
import UploadFilesModal from '@components/Main/components/UploadFilesModal'
import AppLoader from '@components/Loaders/AppLoader'

const Main = () => {
  const error = useSelector(state => state.app.error)
  const cursorWait = useSelector(state => state.app.cursorWait)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(auth())
    }
  }, [])

  return (
    <>
      <Navbar/>
      <Suspense fallback={<AppLoader/>}>
        {error
          ? <Error error={error}/>
          : <div className={cursorWait ? 'loading' : ''}>
            <UploadFilesModal/>
            <Outlet/>
          </div>}
      </Suspense>
    </>
  )
}

export default Main
