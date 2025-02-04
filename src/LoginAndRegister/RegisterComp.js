import React, { useState } from 'react';

const RegisterComp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        role: '', // Start with an empty role
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
        
        if (!formData.role || formData.role === 'Select') newErrors.role = 'Role is required';  // Validate role
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Registration Successful', formData);

            // Show alert for successful registration
            alert('Registered Successfully');

            // Redirect to the login page
            window.location.href = '/Login'; // Adjust this URL based on your application's routing
        }
    };
    
    return (
        <div className='min-vh-100 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#FFF8E1" }}>
            <div className="shadow-lg p-4" style={{ backgroundColor: "white" }}>
                <h2 className="text-center mb-4 RegisterHeader">Register</h2>
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

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                        >
                            <option value="">Select</option> {/* Placeholder option */}
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
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
                    <div className="text-center mt-3 LoginRegisterText">
                        <p>Already have an account ? 
                            <a href="Login" className='RegisterLogin'> Login here</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterComp;