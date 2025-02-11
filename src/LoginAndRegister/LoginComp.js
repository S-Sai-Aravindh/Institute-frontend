 
  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import './Style.css';
  import LoginVisual from '../assets/Login/LoginVisual2.jpg';
  import axios from 'axios';
  
  const LoginComp = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();
  
      const fetchUserDetails = async (email, password) => {
          try {
              const response = await axios.get('http://localhost:5109/api/auth', {
                  params: { email, password }
              });
      
              const user = response.data.find((user) => user.email === email && user.password === password);
      
              if (!user) {
                  alert('Invalid credentials');
                  return null;
              }
      
              console.log("Fetched User Details:", user);
              return user;
      
          } catch (error) {
              console.error("Error fetching user details:", error);
              alert('Failed to fetch user details.');
              return null;
          }
      };
      
      const authenticateUser = async (user) => {
          try {
              const { email, password, name, role, contactDetails } = user;
      
              const tokenResponse = await axios.post('http://localhost:5109/api/auth/login', {
                  email,
                  password,
                  name,
                  role,
                  contactDetails
              });
                    
              const { token } = tokenResponse.data;
              console.log("Received Token:", token);
      
              // Store token and user details in sessionStorage
              sessionStorage.setItem('authToken', token);
              sessionStorage.setItem('userId', user.userId);
              sessionStorage.setItem('role', role);
              sessionStorage.setItem('email', email);
              sessionStorage.setItem('name', name);


              const idresponse = await axios.get('http://localhost:5109/api/auth/Alldetails');
              console.log("All details ::", idresponse.data);

              const storedUserId = sessionStorage.getItem('userId');
              let foundUser = false;  // Flag to check if a matching user was found

              idresponse.data.forEach((user) => {
                  
              if (user.userId === parseInt(storedUserId)) {
                  console.log('Matching user found:', user);
                  console.log(`Student ID: ${user.studentId}`);
                  console.log(`Teacher ID: ${user.teacherId}`);
                  sessionStorage.setItem('studentId', user.studentId);
                  sessionStorage.setItem('teacherId', user.teacherId);
                  foundUser = true;  // Set the flag to true if a matching user is found
              }
              });

              // Only log the error if no matching user was found after checking all users
              if (!foundUser) {
              console.log("Error in fetching ID: No matching user found");
              }
              
             
      
              let path;
              switch (role) {
                  case 'Admin':
                      path = '/Myprofile/admin/dashboard';
                      break;
                  case 'Student':
                      path = '/Myprofile/student/dashboard';
                      break;
                  case 'Teacher':
                      path = '/Myprofile/teacher/dashboard';
                      break;
                  default:
                      path = '/';
              }
            //   navigate(path);
              window.location.href = path;
      
          } catch (error) {
              console.error("Authentication error:", error.response?.data);
              alert(JSON.stringify(error.response?.data, null, 2));
  
          }
      };
      
      const handleLogin = async (e) => {
          e.preventDefault();
          
          const email = e.target.email.value;
          const password = e.target.password.value;
      
          const user = await fetchUserDetails(email, password);
          console.log("User: " , user);
          if (user) {
              await authenticateUser(user);
          }
      };
      
  
  
      return (
          <div className="LoginContainer">
              <div>
                  <div className="row">
                      {/* Left Side: Image Section */}
                      <div className="col-md-6 d-flex justify-content-center align-items-center">
                          <img 
                              src={LoginVisual} 
                              alt="Login Visual" 
                              className="img-fluid rounded"
                          />
                      </div>
  
                      {/* Right Side: Login Form */}
                      <div className="col-md-6 LoginContainerLogin">
                          <h2 className="text-center mb-4 LoginHeader">Login</h2>
  
                          <form onSubmit={handleLogin}>
                              <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email address</label>
                                  <input 
                                      type="email" 
                                      className="form-control" 
                                      id="email" 
                                      placeholder="Enter email" 
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      required 
                                  />
                              </div>
  
                              <div className="mb-3">
                                  <label htmlFor="password" className="form-label">Password</label>
                                  <input 
                                      type="password" 
                                      className="form-control" 
                                      id="password" 
                                      placeholder="Enter password" 
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      required 
                                  />
                              </div>
  
                              <div className="mb-3 text-end">
                                  <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                              </div>
  
                              <button type="submit" className="btn btn-warning w-100">Login</button>
  
                              <div className="text-center mt-3 LoginRegisterText">
                                  <p>Don't have an account? <Link to="/register" className='LoginRegister'>Register here!</Link></p>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      );
  };
  
  export default LoginComp;