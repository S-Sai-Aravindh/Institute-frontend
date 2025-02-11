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

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({ name: "", email: "", contactDetails: "", role: "" });

  const token = sessionStorage.getItem("authToken");
  const userteacherId = sessionStorage.getItem("userId");
  const teacherId = sessionStorage.getItem("teacherId");

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
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
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
            <p className="admin-detail-item"><strong>Name:</strong> <span>{teacher.user.name}</span></p>
            <p className="admin-detail-item"><strong>Email:</strong> <span>{teacher.user.email}</span></p>
            <p className="admin-detail-item"><strong>Role:</strong> <span>{teacher.user.role}</span></p>
            <p className="admin-detail-item"><strong>Contact:</strong> <span>{teacher.user.contactDetails}</span></p>
            
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;