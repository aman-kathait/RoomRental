import React from 'react'
import Herosection from './Herosection'
import Rooms from './Rooms'
import Ourcoverage from './Ourcoverage'
import Footer from '../Common/Footer'
const Dashboard = () => {
  return (
    <div className='md:mt-16'>
      <Herosection />
      <Ourcoverage />
      <Rooms />
      <Footer />
    </div>
  )
}

export default Dashboard
