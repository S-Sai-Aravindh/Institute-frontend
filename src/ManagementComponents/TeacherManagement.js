import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MultiplSelectChecks from "../Components/MultiplSelectChecks"
import "./Style.css";



const TeacherTable = () => {
    const [teachers, setTeachers] = useState([]);
    const [open, setOpen] = useState(false);
    const [courseNames, setCourseNames] = useState([]); // State for course names
    const [delopen, setDelopen] = useState(false); // Dialog open state
    const [teacherIdToDelete, setTeacherIdToDelete] = useState(null); // Store the teacher ID to delete



    const [editedTeacher, setEditedTeacher] = useState({
        teacherId: "",
        name: "",
        email: "",
        contactDetails: "",
        subjectSpecialization: "",
        courses: "",
    });

    const handledelClose = () => {
        setDelopen(false); // Close the dialog
      };
    
      const handleDelete = (teacherId) => {

        setTeacherIdToDelete(teacherId); // Store the teacherId in state
        setDelopen(true); // Open the confirmation dialog
      };

    useEffect(() => {
        axios
            .get("http://localhost:5109/api/admin/teachers")
            .then((response) => {
                console.log("Teachers data:", response.data); 
                // This will print the response.data to the console
                setTeachers(response.data);  // Update state with the fetched data
            })
            .catch((error) => console.error("Error fetching teachers:", error));
       // Fetch all available courses
       axios.get("http://localhost:5109/api/course") 
       .then((response) => {
           const fetchedCourseNames = response.data.map(course => course.courseName);
           setCourseNames(fetchedCourseNames); // Set the course names in state
       })
       .catch((error) => console.error("Error fetching courses:", error));
    }, []);
    

    // useEffect(() => {
    //     // Log the courses whenever editedTeacher is updated
    //     if (editedTeacher.courses.courseName) {
    //         console.log("Courses value in useEffect:", editedTeacher);
    //     }
    // }, [editedTeacher]);

    const handleConfirmDelete = async () => {
        if (teacherIdToDelete) {
            console.log("Teacher ID to delete:", teacherIdToDelete);
            try {
                const response = await axios.delete(`http://localhost:5109/api/admin/teachers/${teacherIdToDelete}`);
                console.log("Teacher deleted:", response.data);
                setTeachers((prevTeachers) =>
                    prevTeachers.filter((teacher) => teacher.teacherId !== teacherIdToDelete)
                );
                setDelopen(false); // Close the delete confirmation dialog after successful deletion
            } catch (error) {
                console.error("Error deleting teacher:", error);
            }
        }
    };


    


    const handleEdit = (teacher) => {
        console.log("selected teacher:" ,teacher);
        setEditedTeacher({
            userId:teacher.user?.userId || "",
            teacherId: teacher.teacherId,
            name: teacher.user?.name || "",
            email: teacher.user?.email || "",
            contactDetails: teacher.user?.contactDetails || "",
            subjectSpecialization: teacher.subjectSpecialization || "",
            // Format courses as a comma-separated string
            courses: Array.isArray(teacher.courses) ? teacher.courses.map(course => course.courseName) : [],
        });
        setOpen(true);
    };

    const handleCheck = ()=>{
        console.log("Edited details:",editedTeacher)
    }

      // validata form 
    
        const [errors, setErrors] = useState({});

    const validateTeacher = () => {
        let tempErrors = {};
    
        // Name validation: Only letters and spaces allowed
        if (!String(editedTeacher.name).trim()) {
            tempErrors.name = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(editedTeacher.name)) {
            tempErrors.name = "Name should only contain letters and spaces";
        }
    
        // Email validation: Should match a valid email format (Gmail example)
        if (!String(editedTeacher.email).trim()) {
            tempErrors.email = "Email is required";
        } else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(editedTeacher.email)) {
            tempErrors.email = "Invalid email format";
        }
    
        // Contact Details validation: Should be exactly 10 digits
        if (!String(editedTeacher.contactDetails).trim()) {
            tempErrors.contactDetails = "Contact details are required";
        } else if (!/^\d{10}$/.test(editedTeacher.contactDetails)) {
            tempErrors.contactDetails = "Invalid contact number (10 digits)";
        }
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    
    

    const handleSave = async () => {
        if (!editedTeacher.teacherId) {
            console.error("Teacher ID is required for update");
            return;
        }
    
        if (validateTeacher()) {
        // Uncommenting and using editedTeacher.courses directly since it's already an array
    // const coursesArray = editedTeacher.courses.length > 0 
    // ? editedTeacher.courses.map(courseName => ({ courseName })) // Create the array of objects
    // : [];
    
        const dataToSend = {
            teacherId: editedTeacher.teacherId,
            user: {
                userId: editedTeacher.userId, // Ensure this is correct
                name: editedTeacher.name,
                email: editedTeacher.email,
                contactDetails: editedTeacher.contactDetails,
                role: "Teacher", // If role is static as "Teacher"
            },
            subjectSpecialization: editedTeacher.subjectSpecialization,
            // courses: coursesArray, // Send courses as an array of objects
        };
    
        console.log("Data to be sent:", dataToSend);
    
        try {
            // Send the PUT request with dataToSend
            const response = await axios.put(
                `http://localhost:5109/api/admin/teachers/${editedTeacher.teacherId}`,
                dataToSend
            );
    
            // Log the response data to verify if it contains the updated teacher object
            console.log("Response from API:", response.data);
    
            // Ensure that response.data contains the expected structure
            // setTeachers((prevTeachers) =>
            //     prevTeachers.map((teacher) =>
            //         teacher.teacherId === editedTeacher.teacherId
            //             ? { ...teacher, ...response.data } // Merge the response data to update teacher
            //             : teacher
            //     )
            // );
            // window.location.reload();
            setOpen(false); // Close the dialog after saving
                setTimeout(() => {
                    setOpen(false); 
                    window.location.reload();
                    // Close again in case state update delays it
                }, 100);
// Close the dialog after saving
        } 
        catch (error) {
            // console.error("Error saving teacher data:", error);
            // if (error.response) {
            //     console.error("Error response data:", error.response.data);
            // }
            setOpen(false); // Close the dialog after saving
                setTimeout(() => {
                    setOpen(false); 
                    window.location.reload();
                    // Close again in case state update delays it
                }, 100);
        }

    }
    };
    

   

    const handleChange = (e) => {
        setEditedTeacher({
            ...editedTeacher,
            [e.target.name]: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="teacher-table-container">
            <h2 className="table-heading">Teacher Details</h2>
            <table className="teacher-table">
                <thead>
                    <tr className="table-header">
                        <th className="table-header-cell">Teacher ID</th>
                        <th className="table-header-cell">Name</th>
                        <th className="table-header-cell">Email</th>
                        <th className="table-header-cell">Contact Details</th>
                        <th className="table-header-cell">Subject Specialization</th>
                        <th className="table-header-cell">Courses</th>
                        <th className="table-header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.teacherId} className="table-row">
                            <td className="table-cell">{teacher.teacherId}</td>
                            <td className="table-cell">{teacher.user?.name || "N/A"}</td>
                            <td className="table-cell">{teacher.user?.email || "N/A"}</td>
                            <td className="table-cell">{teacher.user?.contactDetails || "N/A"}</td>
                            <td className="table-cell">{teacher.subjectSpecialization || "N/A"}</td>
                            <td className="table-cell">
                                {teacher.courses ? (
                                    <ul>
                                        {teacher.courses.map((course, index) => (
                                            <li key={index}>{course.courseName}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    "N/A"
                                )}
                            </td>                            
                            <td className="table-cell">
                                <button className="action-button" onClick={() => handleEdit(teacher)}>Edit</button>
                                <button className="action-button" onClick={() => handleDelete(teacher.teacherId)}>Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dialog for Editing Teacher */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Teacher Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update teacher details below.</DialogContentText>
                    
                     {/* Name */}
        <TextField
            label="Name"
            name="name"
            fullWidth
            value={editedTeacher.name}
            onChange={handleChange}
            className="TeacherEditInput"
            error={!!errors.name}
            helperText={errors.name}
        />
        
        {/* Email */}
        <TextField
            label="Email"
            name="email"
            fullWidth
            value={editedTeacher.email}
            onChange={handleChange}
            className="TeacherEditInput"
            error={!!errors.email}
            helperText={errors.email}
        />
        
        {/* Contact Details */}
        <TextField
            label="Contact Details"
            name="contactDetails"
            fullWidth
            value={editedTeacher.contactDetails}
            onChange={handleChange}
            className="TeacherEditInput"
            error={!!errors.contactDetails}
            helperText={errors.contactDetails}
        />
        
        {/* Subject Specialization */}
        <TextField
            label="Subject Specialization"
            name="subjectSpecialization"
            fullWidth
            value={editedTeacher.subjectSpecialization}
            onChange={handleChange}
            className="TeacherEditInput"
        />
                    
                    
                    
                    {/* <TextField label="Name" name="name" fullWidth value={editedTeacher.name} onChange={handleChange} className="TeacherEditInput"  />
                    <TextField label="Email" name="email" fullWidth value={editedTeacher.email} onChange={handleChange} className="TeacherEditInput" />
                    <TextField label="Contact Details" name="contactDetails" fullWidth value={editedTeacher.contactDetails} onChange={handleChange} className="TeacherEditInput" />
                    <TextField label="Subject Specialization" name="subjectSpecialization" fullWidth value={editedTeacher.subjectSpecialization} onChange={handleChange} className="TeacherEditInput" />
                 */}


                    
                    
                    
                     {/* Replace the TextField for courses with the MultipleSelectCheckmarks component */}
        {/* <MultiplSelectChecks
           personName={editedTeacher.courses} // This is now an array
           setPersonName={(courses) => setEditedTeacher({ ...editedTeacher, courses })} 
           availableCourses={courseNames} // Pass the available courses to the component
        //    className="TeacherCheckboxEditInput"
        />
                 */}
                
                
                
                    {/* <TextField label="Courses" name="courses" fullWidth value={editedTeacher.courses} onChange={handleChange} className="TeacherEditInput"/> */}
                
                
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog */}
      <Dialog open={delopen} onClose={handledelClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handledelClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
};

export default TeacherTable;

