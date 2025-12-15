import React from 'react'
import { Link } from 'react-router-dom'
const CoverageBox = ({title, Icon, text}) => {
  return (
    <div className='bg-white mx-auto rounded-xl shadow w-70 mt-8 '>
    <div className=''>
      <div className="bg-white rounded-4xl flex flex-col  w-70  p-6">
      <Icon className="w-8 h-8 text-primary mb-4 " strokeWidth={2}/>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-3">{text}</p>
       <button className='text-left text-primary mt-3 hover:underline hover:text-blue-500'><Link to="/rooms">Book your room-{">"}</Link></button>
      
    </div>
    </div>
    </div>
  )
}

export default CoverageBox
