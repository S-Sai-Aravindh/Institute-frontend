 
import React, { useState } from 'react';

const RegisterComp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
      });
    
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number should be 10 digits';
    
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          console.log('Registration Successful', formData);
          // Here you can add API call to register the user
          setFormData({ name: '', email: '', mobile: '', password: '' }); // Clear form
        }
      };
    
      return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter your name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
    
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
    
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
              </div>
    
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
    
              <button
                type="submit"
                className="btn btn-warning w-100 fw-bold"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      );
    };

export default RegisterComp