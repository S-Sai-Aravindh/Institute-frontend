import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentPageComp = () => {
  return (
    <div>StudentPageComp
      <Outlet></Outlet>
    </div>
  )
}

export default StudentPageComp