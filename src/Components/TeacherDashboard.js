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
import "./Style.css"; 

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

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [subjectSpecialization, setSubjectSpecialization] = useState("");
  const [editedData, setEditedData] = useState({ name: "", email: "", contactDetails: "", role: "" });

  const token = sessionStorage.getItem("authToken");
  const userteacherId = sessionStorage.getItem("userId");
  const teacherId = sessionStorage.getItem("teacherId");

    const [errors, setErrors] = React.useState({});

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`http://localhost:5109/api/admin/teachers/${teacherId}`);
        setTeacher(response.data);
        setCourses(response.data.courses);
        setEditedData({
          name: response.data.user.name,
          email: response.data.user.email,
          contactDetails: response.data.user.contactDetails,
          role: response.data.user.role,
        });

        // Fetch subject specialization from the teacher-specific endpoint
        const subjectResponse = await axios.get(`http://localhost:5109/api/teacher/${teacherId}`);
        setSubjectSpecialization(subjectResponse.data.subjectSpecialization); // Set the subject specialization


      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }


    };

    fetchTeacherData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

    if (!validateForm()) {
      return; // Prevent save if validation failed
    }

    try {
      const response = await axios.put(
        `http://localhost:5109/api/auth/${userteacherId}`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setTeacher(response.data);
        sessionStorage.setItem("name", response.data.user.name);
        window.location.reload();
      } else {
        console.warn("No data returned from the update response.");
      }

      setOpen(false);
    } catch (error) {
      console.error("Error saving teacher data:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="my-details-title">My Details</h2>
      {teacher && (
        <>
          <div className="admin-details">
            <p className="admin-detail-item"><strong>Teacher ID:</strong> <span>{teacherId}</span></p>
            <p className="admin-detail-item"><strong>Name:</strong> <span>{teacher.user.name}</span></p>
            <p className="admin-detail-item"><strong>Email:</strong> <span>{teacher.user.email}</span></p>
            <p className="admin-detail-item"><strong>Role:</strong> <span>{teacher.user.role}</span></p>
            <p className="admin-detail-item"><strong>Contact:</strong> <span>{teacher.user.contactDetails}</span></p>
            <p className="admin-detail-item"><strong>Specialization:</strong> <span>{subjectSpecialization}</span></p>
            
            <div className="button-container">
              <Button variant="outlined" onClick={handleClickOpen} className="studentEditbutton">Edit</Button>
              <Link to="/Myprofile/teacher/createcourse" className="button Enrollbuttonstudent">
              Create New Course
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

export default TeacherDashboard;