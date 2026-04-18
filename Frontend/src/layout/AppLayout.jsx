import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
const AppLayout = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Outlet/>
     
    </div>
  )
}

export default AppLayout
