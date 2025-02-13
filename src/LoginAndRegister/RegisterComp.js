import React, { useState } from 'react';
import axios from 'axios';

const RegisterComp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    contactDetails: '',
    courseId: '', // Add courseId for Student role
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
    else if (!/^[A-Za-z\s]{3,}$/.test(formData.name)) newErrors.name = "Invalid Name";
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.contactDetails.trim()) newErrors.contactDetails = 'Contact number is required';
    else if (!/^\d{10}$/.test(formData.contactDetails)) newErrors.contactDetails = 'Contact number should be 10 digits';

    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(formData.password)) {
        newErrors.password = 'Password must be Strong eg (Mirai@12)';
    }

    if (!formData.role || formData.role === 'Select') newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:5109/api/auth/register", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        alert("Registered Successfully");
        console.log("Register data:", response.data);
        window.location.href = "/Login";
      } catch (error) {
        console.error("Error:", error);
        alert(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#FFF8E1" }}>
      <div className="shadow-lg p-4" style={{ backgroundColor: "white",marginTop:"50px",marginBottom:"50px" }}>
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
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleChange}
              className={`form-control ${errors.contactDetails ? 'is-invalid' : ''}`}
              placeholder="Enter your contact number"
            />
            {errors.contactDetails && <div className="invalid-feedback">{errors.contactDetails}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
            >
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          {formData.role === 'Student' && (
            <div className="mb-3">
              <label className="form-label">Course ID</label>
              <input
                type="number"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className={`form-control ${errors.courseId ? 'is-invalid' : ''}`}
                placeholder="Enter your course ID"
              />
              {errors.courseId && <div className="invalid-feedback">{errors.courseId}</div>}
            </div>
          )}

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

          <button type="submit" className="btn btn-warning w-100 fw-bold">
            Register
          </button>
          <div className="text-center mt-3 LoginRegisterText">
            <p>Already have an account? 
              <a href="Login" className='RegisterLogin'> Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComp;
