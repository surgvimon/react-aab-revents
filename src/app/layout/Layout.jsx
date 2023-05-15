import React from 'react'
import NavBar from '../../features/nav/NavBar'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const location = useLocation();
  return (
    <>
    {location.pathname !== "/" ? <NavBar/> : <></>}
      <Outlet />
    </>
  )
}
