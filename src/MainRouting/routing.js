import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../MainPage/mainpage';
import PagenotFound from '../layout/PagenotFound';
import HomeComp from '../MainPage/HomeComp';
import AboutUsComp from '../MainPage/AboutUsComp';
import BatchesComp from '../MainPage/BatchesComp';
import AllCoursesComp from '../MainPage/AllCoursesComp';
import ContactUsComp from '../MainPage/ContactUsComp';
import RegisterComp from '../LoginAndRegister/RegisterComp';
import LoginComp from '../LoginAndRegister/LoginComp';
import AdminPageComp from '../RolesComponents/AdminPageComp';
import StudentPageComp from '../RolesComponents/StudentPageComp';
import TeacherPageComp from '../RolesComponents/TeacherPageComp';
import MyProfilePageComp from '../RolesComponents/MyProfilePageComp';
import ProtectedRouting from './ProtectedRouting';
import StudentManagement from '../ManagementComponents/StudentManagement';
import TeacherManagement from '../ManagementComponents/TeacherManagement';
import CourseManagement from '../ManagementComponents/CourseManagement';
import BatchManagement from '../ManagementComponents/BatchManagement';
import Reports from '../ManagementComponents/Reports';
import StudentDashboard from '../Components/StudentComponents/StudentDashboard';
import TeacherDashboard from '../Components/TeacherDashboard';
import EnrolledCourses from '../Components/EnrolledCourses';
import CreateCourse from '../Components/CreateCourse';
import AdminDashboard from '../Components/AdminDashboard';
import ForgotPassComp from '../LoginAndRegister/ForgotPassComp';
import MyCourse from '../Components/StudentComponents/MyCourse';
import StudAllCoursesComp from '../Components/StudentComponents/StudAllCoursesComp';
import StudentBatch from '../Components/StudentComponents/StudentBatch';
import TeachCourseList from '../Components/TeacherComponents/TeachCourseLIst';
import QueryTable from '../Components/QueryTable';
import EnrollForm from '../Components/StudentComponents/Enrollrequestform';
import Enrollreq from '../Components/Enrollreq';


const routing = createBrowserRouter([
    
    { path: '', 
      element: <MainPage /> 
      // element: <ProtectedRouting Component={MainPage}/>
      ,children:[
      {path:'',element:<HomeComp />},
      {path:'AboutUs',element:<AboutUsComp/>},
      {path:'Batches',element:<BatchesComp/>},
      {path:'AllCourses',element:<AllCoursesComp/>},
      {path:'ContactUs',element:<ContactUsComp/>},
      {path:'Login',element:<LoginComp/>},
      {path:'Register',element: <RegisterComp/>},
      {path:'admin',element: <AdminPageComp/>},
      {path:'student',element: <StudentPageComp/>},
      {path:'teacher',element: <TeacherPageComp/>},
      {path:'forgot-password',element: <ForgotPassComp/>},

      { path: 'Myprofile' , element: <MyProfilePageComp/> 
        , children:[
        {path:'admin',element:<AdminPageComp />, children:[
          {path:'dashboard',element:<AdminDashboard />},
          {path:'students',element:<StudentManagement />},
          {path:'teachers',element:<TeacherManagement />},
          {path:'courses',element:<CourseManagement />},
          {path:'batches',element:<BatchManagement />},
          {path:'queries',element:<QueryTable />},
          {path:'enrollrequest',element:<Enrollreq />}
        ]},
        {path:'student',element:<StudentPageComp /> , children:[
          {path:'dashboard',element:<StudentDashboard />}, 
          {path:'mycourse',element:<MyCourse />}, 
          {path:'allcourses',element:<StudAllCoursesComp />}, 
          {path:'batch',element:<StudentBatch />}, 
          {path:'enrollform',element:<EnrollForm />}, 
        ]},
        {path:'teacher',element:<TeacherPageComp /> , children:[
          {path:'dashboard',element:<TeacherDashboard />},
          {path:'enrolledcourses',element:<EnrolledCourses />},
          {path:'createcourse',element:<CourseManagement />},
          {path:'students',element:<TeachCourseList />},
          {path:'batches',element:<StudentManagement />},
          {path:'batch',element:<StudentBatch />},
        ]}
      ]
    },

    ] },

    
    { path: '*', element: <PagenotFound /> },
  ]);
  
  export default routing;