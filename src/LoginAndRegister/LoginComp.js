import React from 'react'
import { Link , useNavigate } from 'react-router-dom';
// import LoginVisual from '../assets/Login/LoginVisual2.jpg'
const LoginComp = () => {
    return (
        <div className="container-fluid login-page">
          <div className="row">
            {/* Left Side: Image Section */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img 
                // src={LoginVisual} 
                alt="Login Visual" 
                className="img-fluid rounded "
              />
            </div>

  

    
            {/* Right Side: Login Form */}
            <div className="col-md-6 bg-light p-5">
              <h2 className="text-center mb-4">Login</h2>
    
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
    
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" required />
                </div>
    
                <div className="mb-3 text-end">
              <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
            </div>
    
                <button type="submit" className="btn btn-warning w-100">Login</button>
    
                <div className="text-center mt-3 ">
                  <p>Don't have an account? <a href="Register" className='text-decoration-none'> Register</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } 



export default LoginComp;