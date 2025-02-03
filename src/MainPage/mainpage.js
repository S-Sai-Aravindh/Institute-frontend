import React from 'react'
import HeaderComp from '../layout/HeaderComp'
import FooterComp from '../layout/FooterComp'
import { Outlet } from 'react-router-dom';
import './Style.css'

const mainpage = () => {
  return (
    <div>
    <div><HeaderComp/></div>
    <div ><Outlet/></div>
    <div><FooterComp/></div>
    </div>
  )
}

export default mainpage