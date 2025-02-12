import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Style.css";
import { Email } from "@mui/icons-material";

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [delopen, setDelOpen] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [courseValues, setCourseValues] = useState({
      courseName: '',
      courseDescription: '',
      teacherId: '',
    });

    const [courseIdToDelete, setCourseIdToDelete] = useState(null);
    const [editedCourse, setEditedCourse] = useState({
        courseId: "",
        courseName: "",
        description: "",
    });
    // create boxes 
    const handleCClose = () => {
        setIsDialogOpen(false);
      };

      const handleCChange = (event) => {
        const { name, value } = event.target;
        // Update the form values in the state
        setCourseValues({ ...courseValues, [name]: value });
      };

      const handleCSave = async (event) => {
        event.preventDefault();
    
        // Get the course details from the form
        const courseName = courseValues.courseName;
        const description = courseValues.courseDescription;
        const teacherId = courseValues.teacherId;
    
        // Make the POST request using axios
        try {
          const response = await axios.post('http://localhost:5109/api/admin/courses', {
            courseName: courseName,
            description: description,
            teacher: {
              teacherId: teacherId,
            },
          });
    
          console.log(response);
          setIsDialogOpen(false); // Close the dialog box after successful post
        } catch (error) {
          console.error(error);
        }
      };

    // end create boxes 

    useEffect(() => {
        axios
            .get("http://localhost:5109/api/admin/courses")
            .then((response) => {
                setCourses(response.data)
                console.log("Courses details:",response.data)
            })
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    const handleEdit = (course) => {
        setEditedCourse({
            courseId: course.courseId,
            courseName: course.courseName,
            description: course.description,
            teacherId: course.teacher.teacherId
        });
        console.log("Selected Course: ",editedCourse)
        setOpen(true);
    };

    const handleSave = async () => {
        if (!editedCourse.courseId) {
            console.error("Course ID is required for update");
            return;
        }

        const dataToSend = {
            courseId: editedCourse.courseId,
            courseName: editedCourse.courseName,
            description: editedCourse.description,
            Teacher: {
                TeacherId: editedCourse.teacherId, 
            },
        };

        console.log("Data to send:",dataToSend);

        try {
            await axios.put(
                `http://localhost:5109/api/admin/courses/${editedCourse.courseId}`,
                dataToSend
            );

            // Fetch updated course data from the backend
            const response = await axios.get("http://localhost:5109/api/admin/courses");
            setCourses(response.data);

            setOpen(false);
        } catch (error) {
            console.error("Error saving course data:", error);
        }
    };

    const handleConfirmDelete = async () => {
        if (courseIdToDelete) {
            try {
                await axios.delete(`http://localhost:5109/api/admin/courses/${courseIdToDelete}`);
                setCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseIdToDelete));
            } catch (error) {
                console.error(`Error deleting course with ID ${courseIdToDelete}:`, error);
            }
        }
        handleDelClose();
    };

    const handleDelClickOpen = (courseId) => {
        setCourseIdToDelete(courseId);
        setDelOpen(true);
    };

    const handleDelClose = () => {
        setDelOpen(false);
        setCourseIdToDelete(null);
    };

    const handleChange = (e) => {
        setEditedCourse({
            ...editedCourse,
            [e.target.name]: e.target.value,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="course-management-container">
            <h2 className="table-heading">Course Management</h2>
            <button className="create-course-btn" onClick={() => setIsDialogOpen(true)}>Create Course</button>
            <table className="course-table">
                <thead>
                    <tr className="table-header">
                        <th className="table-header-cell">Course ID</th>
                        <th className="table-header-cell">Course Name</th>
                        <th className="table-header-cell">Description</th>
                        <th className="table-header-cell">Teacher Assigned (ID)</th>
                        <th className="table-header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.courseId} className="table-row">
                            <td className="table-cell">{course.courseId}</td>
                            <td className="table-cell">{course.courseName}</td>
                            <td className="table-cell">{course.description}</td>
                            <td className="table-cell">{course.teacher.teacherId}</td>
                            <td className="table-cell">
                                <button className="action-button" onClick={() => handleEdit(course)}>Edit</button>
                                <button className="action-button" onClick={() => handleDelClickOpen(course.courseId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog open={isDialogOpen} onClose={handleCClose}>
        <DialogTitle>Create Course</DialogTitle>
        <DialogContent>
          <DialogContentText>Create course details below.</DialogContentText>
          <TextField
            label="Course Name"
            name="courseName"
            fullWidth
            value={courseValues.courseName}
            onChange={handleCChange}
            className="Studenteditinput"
          />
          <TextField
            label="Course Description"
            name="courseDescription"
            fullWidth
            value={courseValues.courseDescription}
            onChange={handleCChange}
            className="Studenteditinput"
          />
          <TextField
            label="Teacher ID"
            name="teacherId"
            fullWidth
            value={courseValues.teacherId}
            onChange={handleCChange}
            className="Studenteditinput"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCClose}>Cancel</Button>
          <Button onClick={handleCSave}>Save</Button>
        </DialogActions>
      </Dialog>

            {/* Dialog for Editing Course */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Course Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update course details below.</DialogContentText>
                    <TextField label="Course Name" name="courseName" fullWidth value={editedCourse.courseName} onChange={handleChange} className="Studenteditinput" />
                    <TextField label="Description" name="description" fullWidth value={editedCourse.description} onChange={handleChange} className="Studenteditinput" />
                    <TextField label="Teacher ID" name="teacherId" fullWidth value={editedCourse.teacherId} onChange={handleChange} className="Studenteditinput" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Deleting Course */}
            <Dialog open={delopen} onClose={handleDelClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this course? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CourseManagement;
