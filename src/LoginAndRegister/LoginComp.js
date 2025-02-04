import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';
import LoginVisual from '../assets/Login/LoginVisual2.jpg';
import axios from 'axios';

const LoginComp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();




    const handleLogin = async (e) => {
        e.preventDefault();
    
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        try {
            // Sending email and password as query parameters in GET request
            const response = await axios.get('http://localhost:5109/api/auth', {
                params: {
                    email,
                    password
                }
            });
    
            // Check if the response contains a list of users
            const user = response.data.find((user) => user.email === email && user.password === password);
            
            if (!user) {
                alert('Invalid credentials');
                return;
            }
    
            // Extract user data from the matched user
            const { role, userId, name } = user;
            console.log("Fetched Data from API:", user);
            console.log("User ID:", userId);
            console.log("User Name:", name);
    
            // Navigate based on role
            switch (role) {
                case 'Admin':
                    navigate('/Myprofile/admin');
                    break;
                case 'Student':
                    navigate('/student');
                    break;
                case 'Teacher':
                    navigate('/teacher');
                    break;
                default:
                    navigate('/');
            }
        } catch (error) {
            if (error.response) {
                // Server returned a response outside the 2xx range
                alert(error.response.data.message || 'Failed to authenticate.');
            } else if (error.request) {
                // No response received
                console.error("No response from server:", error.request);
                alert('Failed to connect to the server.');
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                alert('An error occurred while processing your request.');
            }
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