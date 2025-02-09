import React from 'react';
import { Outlet } from 'react-router-dom';
import DashNav from '../layout/DashNav';
import './Style.css';

const TeacherPageComp = () => {
  const name = sessionStorage.getItem('name'); 

  return (
    <div className='TeacherPageCompContainer'>
      <div className='TeacherPageNav'>
        <DashNav />
      </div>
      <div className='TeacherPageOutlet'>
        <h1 className='dashboard-heading'>
          Welcome to your dashboard, <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherPageComp;
