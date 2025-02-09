import React from 'react';
import { Outlet } from 'react-router-dom';
import DashNav from '../layout/DashNav';
import './Style.css';

const StudentPageComp = () => {
  const name = sessionStorage.getItem('name'); 

  return (
    <div className='StudentPageCompContainer'>
      <div className='StudentPageNav'>
        <DashNav />
      </div>
      <div className='StudentPageOutlet'>
        <h1 className='dashboard-heading'>
          Welcome to your dashboard, <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentPageComp;
