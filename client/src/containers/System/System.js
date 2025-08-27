import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Footer, Header, SideBar } from './Index'

const System = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />

  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <Header />
      <div className='flex w-full h-screen flex-auto'>
        <SideBar />
        <div className='flex-auto bg-white shadow-sm h-full p-4 overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default System