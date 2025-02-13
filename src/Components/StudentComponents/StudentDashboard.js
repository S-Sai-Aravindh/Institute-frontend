import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import '../Style.css'; // Include your styles as necessary

const validationRules = {
  name: {
    required: {
      value: true,
      message: 'Please enter your name',
    },
    pattern: {
      value: /^[a-zA-Z ]+$/,
      message: 'Please enter a valid name (no numbers or special characters)',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Please enter a valid email',
    },
    pattern: {
      value: /^[a-zA-Z0-9]{3,20}@gmail\.com$/,
      message: 'Please enter a valid email address',
    },
  },
  role: {
    required: {
      value: true,
      message: 'Please enter your role',
    },
  },
  contactDetails: {
    required: {
      value: true,
      message: 'Please enter your contact details',
    },
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Please enter valid contact details',
    },
  },
};

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  
  const [open, setOpen] = useState(false); // State for dialog
  const [editedData, setEditedData] = useState({ name: '', email: '', contactDetails: '',batchId:'' ,role:'' });
  const token = sessionStorage.getItem('authToken');

  const userstudentId = sessionStorage.getItem('userId');
  const studentId = sessionStorage.getItem('studentId');
  const [errors, setErrors] = React.useState({});

  // student enroll form start
  
  

  
  // student enroll form end


  useEffect(() => {
    // Fetch student profile data
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5109/api/admin/students/${studentId}`);
        setStudent(response.data);
        console.log("User details: ",response.data);
        setEditedData({
          name: response.data.user.name,
          email: response.data.user.email,
          contactDetails: response.data.user.contactDetails,
          batchId: response.data.batchId,
          role: response.data.user.role
        });
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    resetForm(); // Reset form on dialog close

  };

  const resetForm = () => {
    setEditedData({
      name: '',
      email: '',
      role: '',
      contactDetails: ''
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    // Check validations based on rules
    for (const field in validationRules) {
      const rules = validationRules[field];
      if (rules.required.value && !editedData[field]) {
        newErrors[field] = rules.required.message;
      } else if (rules.pattern && !rules.pattern.value.test(editedData[field])) {
        newErrors[field] = rules.pattern.message;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors means valid
  };

  const handleSave = async () => {
    if (!userstudentId) {
      console.error("Student ID is required for update");
      return;
    }

    if (!validateForm()) {
      return; // Prevent save if validation failed
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5109/api/auth/${userstudentId}`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data) {
        setStudent(response.data); // Update student data with response
        sessionStorage.setItem("name", response.data.user.name);
        window.location.reload();
      } else {
        console.warn("No data returned from the update response.");
      }
  
      setOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error(
        "Error saving student data:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  return (
    <div className="admin-dashboard-container">
      <h2 className="my-details-title">My Details</h2>
      {student && (
  <>
    <div className="admin-details">
      <p className="admin-detail-item"><strong>Student ID:</strong> <span>{studentId}</span></p>
      <p className="admin-detail-item"><strong>Name:</strong> <span>{student.user.name}</span></p>
      <p className="admin-detail-item"><strong>Email:</strong> <span>{student.user.email}</span></p>
      <p className="admin-detail-item"><strong>Role:</strong> <span>{student.user.role}</span></p>
      <p className="admin-detail-item"><strong>Contact:</strong> <span>{student.user.contactDetails}</span></p>
      <div className="button-container">
        <Button variant="outlined" onClick={handleClickOpen} className="studentEditbutton">Edit</Button>
        <Link to="/Myprofile/student/enrollform" className="button Enrollbuttonstudent">
          Enroll in Courses
        </Link>
      </div>
    </div>
  </>
)}

      {/* Material-UI Dialog for editing */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your profile details, please edit the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedData.name}
            onChange={handleChange}
            error={!!errors.name} // Display error state if exists
            helperText={errors.name} // Display error message
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={editedData.email}
            onChange={handleChange}
            error={!!errors.email} // Display error state if exists
            helperText={errors.email} // Display error message
          />
          <TextField
            margin="dense"
            id="contactDetails"
            name="contactDetails"
            label="Contact Details"
            type="text"
            fullWidth
            variant="standard"
            value={editedData.contactDetails}
            onChange={handleChange}
            error={!!errors.contactDetails} // Display error state if exists
            helperText={errors.contactDetails} // Display error message
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              handleSave();  // Call save function
            }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;