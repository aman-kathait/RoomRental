import React from 'react'
import Navbar from './Common/Navbar'
import Footer from './Common/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
     
    </div>
  )
}

export default Layout
