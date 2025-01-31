import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../MainPage/mainpage';
import PagenotFound from '../layout/PagenotFound';


const routing = createBrowserRouter([
    
    { path: '', element: <MainPage /> },
    // { path: '/Register', element: <RegisterForm /> },
    // {
    //   path: 'admin',
    //   element: <AdminComp />,
    //   children: [
    //     { path: '', element: <LoggedInUserDetails loggedInUser={2}/> },  
    //     { path: 'allemployees', element: <AllEmpComp /> },
    //     { path: 'AttendanceRecord', element: <AttendanceRecords /> },
    //   ],
    // },
  
    // {
    //   path: 'employee/:empId', element : <EmployeePage /> , children :[
    //     {path: 'AttendanceForm', element: <AttendanceForm/>},
    //     {path: 'EmployeeDetails', element: <EmployeeDetailsWrapper/>}
    //   ],
    // },
    { path: '*', element: <PagenotFound /> },
  ]);
  
  export default routing;