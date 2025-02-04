import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';
import LoginVisual from '../assets/Login/LoginVisual2.jpg';

const LoginComp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // Navigate based on role
            switch (data.role) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'student':
                    navigate('/student');
                    break;
                case 'teacher':
                    navigate('/teacher');
                    break;
                default:
                    navigate('/');
            }
        } else {
            alert('Login failed. Please check your email and password.');
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