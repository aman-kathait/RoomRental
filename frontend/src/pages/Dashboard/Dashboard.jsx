import React from 'react'
import Herosection from './Herosection'
import Rooms from './Rooms'
import Ourcoverage from './Ourcoverage'
const Dashboard = () => {
  return (
    <div className='md:mt-16'>
      <Herosection />
      <Rooms />
      <Ourcoverage />
    </div>
  )
}

export default Dashboard
