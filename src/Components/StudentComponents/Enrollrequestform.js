import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import axios from "axios";

const EnrollForm = () => {
  // State to handle form fields
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState(""); // State for error handling

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "studentId") setStudentId(value);
    if (name === "courseId") setCourseId(value);
    if (name === "courseName") setCourseName(value);
  };

  // Handle POST request
  const handleEnroll = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    const enrollRequest = {
      StudentId: studentId,
      CourseId: courseId,
      CourseName: courseName,
    };

    try {
      const response = await axios.post("http://localhost:5109/api/enrollrequest", enrollRequest);
      console.log("Enroll request success:", response.data);
      // Reset form fields after successful submission
      setStudentId("");
      setCourseId("");
      setCourseName("");
    } catch (error) {
      console.error("Error during enroll request:", error);
      setError("An error occurred during enrollment. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
        
        <h1 className="my-details-title">Enroll in Course</h1>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleEnroll} style={{minHeight:"35.65vh"}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student ID"
              type="number"
              variant="outlined"
              name="studentId"
              value={studentId}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Course ID"
              type="number"
              variant="outlined"
              name="courseId"
              value={courseId}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Course Name"
              type="text"
              variant="outlined"
              name="courseName"
              value={courseName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" className="studentEditbutton" color="primary" type="submit">
              Enroll
            </Button>
            
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EnrollForm;
