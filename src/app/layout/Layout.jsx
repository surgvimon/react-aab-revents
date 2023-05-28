import React from 'react'
import NavBar from '../../features/nav/NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';

export default function Layout() {
  //const {key} = useLocation();
  const location = useLocation();
  const { initialized } = useSelector( (state) => state.async);

  if (!initialized) return <LoadingComponent content='Loading app...' />

  return (
    <>
    {location.pathname !== "/" ? <NavBar/> : <></>}
      <Outlet />
    </>
  )
}
