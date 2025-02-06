import React, { useState } from 'react';
import axios from 'axios';
import './Style.css'; // Import the CSS file

const ForgotPassComp = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!newPassword) {
      setError('New password is required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Replace with your backend URL
      const response = await axios.post('https://your-backend-url.com/api/reset-password', {
        email,
        newPassword,
      });

      if (response.data.success) {
        setSuccess('Password reset successfully!');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className=' d-flex justify-content-center ForgotContainer' style={{ backgroundColor: "#FFF8E1" }}>
      <div className="shadow-lg p-4 ForgotForm" style={{ backgroundColor: "white" }}>
      <h2 className="ForgotHeader">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br></br>
          <input
            type="email"
            value={email}
            className='form-control forinput'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label><br></br>
          <input
            type="password"
            value={newPassword}
            className='form-control forinput'
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label><br></br>
          <input
            type="password"
            value={confirmPassword}
            className='form-control forinput'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" className="ForgotLogin">Reset Password</button>
      </form>
      </div>
    </div>
  );
};

export default ForgotPassComp;