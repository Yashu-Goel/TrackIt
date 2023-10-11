import React from 'react'
import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
const Dashboard = () => {
  return (
    <div>
        <div><Navbar/></div>
        <div>
            <LeftSidebar/>
        </div>
    </div>
  )
}

export default Dashboard