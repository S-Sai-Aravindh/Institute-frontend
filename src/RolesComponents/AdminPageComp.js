import React from 'react';
import { Outlet } from 'react-router-dom';
import DashNav from '../layout/DashNav';
import './Style.css';

const AdminPageComp = () => {
  const name = sessionStorage.getItem('name'); 

  return (
    <div className='AdminPageCompContainer'>
      <div className='AdminPageNav'>
        <DashNav />
      </div>
      <div className='AdminPageOutlet'>
      <h1 className='dashboard-heading'>Welcome to your dashboard, <strong style={{textTransform:"capitalize"}}>{name}</strong></h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPageComp;
