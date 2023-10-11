import React from 'react'
import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
const Dashboard = () => {
  return (
    <div>
        <Navbar/>
        <div className='flexBox-Dash'>
            <LeftSidebar/>
            <div className='CenterMain'>

            </div>
            <RightSidebar />
        </div>
    </div>
  )
}

export default Dashboard