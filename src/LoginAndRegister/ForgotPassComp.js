// import React, { useState } from 'react';
// import axios from 'axios';
// import './Style.css'; // Import the CSS file

// const ForgotPassComp = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // Basic validation
//     if (!email) {
//       setError('Email is required');
//       return;
//     }
//     if (!newPassword) {
//       setError('New password is required');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       // Replace with your backend URL
//       const response = await axios.post('https://your-backend-url.com/api/reset-password', {
//         email,
//         newPassword,
//       });

//       if (response.data.success) {
//         setSuccess('Password reset successfully!');
//       } else {
//         setError('Failed to reset password. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className=' d-flex justify-content-center ForgotContainer' style={{ backgroundColor: "#FFF8E1" }}>
//       <div className="shadow-lg p-4 ForgotForm" style={{ backgroundColor: "white" }}>
//       <h2 className="ForgotHeader">Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label><br></br>
//           <input
//             type="email"
//             value={email}
//             className='form-control forinput'
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>New Password:</label><br></br>
//           <input
//             type="password"
//             value={newPassword}
//             className='form-control forinput'
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm Password:</label><br></br>
//           <input
//             type="password"
//             value={confirmPassword}
//             className='form-control forinput'
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {success && <p style={{ color: 'green' }}>{success}</p>}
//         <button type="submit" className="ForgotLogin">Reset Password</button>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassComp;

// import { useState } from "react";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handlePasswordReset = async () => {
//     try {
//       const response = await fetch("http://localhost:5109/api/auth");
//       const users = await response.json();

//       const user = users.find((u) => u.email === email);
//       if (!user) {
//         alert("User not found");
//         return;
//       }

//       // Update the password
//       const updatedUser = { ...user, password: newPassword };

//       // Send the update request to the backend
//       const updateResponse = await fetch(`http://localhost:5109/api/auth/UpdatePassword`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, newPassword }),
//       });
      

//       if (updateResponse.ok) {
//         alert("Password updated successfully");
//       } else {
//         alert("Failed to update password");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//       <button onClick={handlePasswordReset}>Reset Password</button>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import "./Style.css"; // Import the CSS file

const ForgotPassComp = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    window.location.href="login";
    // setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!newPassword) {
      setError("New password is required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5109/api/auth/UpdatePassword", {
        email,
        newPassword,
      });

      if (response.status === 200) {
        setSuccess("Password reset successfully!");
        setOpen(true);
        
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center ForgotContainer" style={{ backgroundColor: "#FFF8E1" }}>
      <div className="shadow-lg p-4 ForgotForm" style={{ backgroundColor: "white" }}>
        <h2 className="ForgotHeader">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              className="form-control forinput"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label><br />
            <input
              type="password"
              value={newPassword}
              className="form-control forinput"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label><br />
            <input
              type="password"
              value={confirmPassword}
              className="form-control forinput"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <button type="submit" className="ForgotLogin">Reset Password</button>
        </form>
      </div>


      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Password Reseted Successfully"}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                Password reseted successfully !
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default ForgotPassComp;

