import React from 'react'
import { useState } from "react";

const ContactUsComp = () => {
    const [formData, setFormData] = useState({ name: "", email: "", contact: "", message: "" });
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const validate = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.contact.trim()) newErrors.contact = "Contact No is required";
      if (!formData.message.trim()) newErrors.message = "Message is required";
      return newErrors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        console.log("Form Submitted:", formData);
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", contact: "", message: "" });
        setErrors({});
      }
    };
  
    return (
      <div className="container mt-5"  >
        <h2 className="text-center mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm" style={{backgroundColor:"white" }}>
          <div className="mb-3" >
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              style={{border:"solid 2px "}}
            />
            {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
          </div>
  
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              style={{border:"solid 2px "}}
            />
            {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
          </div>
  
          <div className="mb-3">
            <label className="form-label">Contact No</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-control"
              style={{border:"solid 2px "}}
            />
            {errors.contact && <div className="text-danger mt-1">{errors.contact}</div>}
          </div>
  
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="form-control"
              style={{border:"solid 2px "}}
            ></textarea>
            {errors.message && <div className="text-danger mt-1">{errors.message}</div>}
          </div>
  
          <button type="submit" className="btn btn-warning w-100">
            Submit
          </button>
        </form>
      </div>
    );
}

export default ContactUsComp
