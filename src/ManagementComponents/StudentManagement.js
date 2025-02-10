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

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [delopen, setdelOpen] = useState(false);
    const [studentIdToDelete, setStudentIdToDelete] = useState(null);
    const [editedStudent, setEditedStudent] = useState({
        studentId: "",
        name: "",
        email: "",
        contactDetails: "",
        batchId: "",
        batchName: "",
        batchTiming: "",
        batchType: "",
        courseName: "",
        courseDescription: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:5109/api/admin/students")
            .then((response) => {setStudents(response.data)
                console.log("Student data: ",response.data)
            })
            .catch((error) => console.error("Error fetching students:", error));
    }, []);

    const handleEdit = (student) => {
        setEditedStudent({
            studentId: student.studentId,
            name: student.user?.name || "",
            email: student.user?.email || "",
            contactDetails: student.user?.contactDetails || "",
            batchId: student?.batchId || "", // Ensure batchId is included for updates
            batchName: student.batch?.batchName || "",
            batchTiming: student.batch?.batchTiming || "",
            batchType: student.batch?.batchType || "",
            courseName: student.batch?.course?.courseName || "",
            courseDescription: student.batch?.course?.description || "",
        });
        setOpen(true);
    };

    const handleSave = async () => {
        if (!editedStudent.studentId) {
            console.error("Student ID is required for update");
            return;
        }
    
        const dataToSend = {
            studentId: editedStudent.studentId,
            user: {
                name: editedStudent.name,
                email: editedStudent.email,
                contactDetails: editedStudent.contactDetails,
            },
            batchId: editedStudent.batchId || null, // Ensure batchId is sent
        };
    
        console.log("Data to be sent:", dataToSend);
    
        try {
            await axios.put(
                `http://localhost:5109/api/admin/students/${editedStudent.studentId}`,
                dataToSend
            );
    
            // Fetch updated student data from the backend
            const response = await axios.get("http://localhost:5109/api/admin/students");
            setStudents(response.data); 
    
            setOpen(false);
        } catch (error) {
            console.error("Error saving student data:", error);
        }
    };
    

    const handleConfirmDelete = async (studentId) => {
        if (studentIdToDelete) {
            try {
                await axios.delete(`http://localhost:5109/api/admin/students/${studentIdToDelete}`);
                setStudents(prevStudents => prevStudents.filter(student => student.studentId !== studentIdToDelete));
            } catch (error) {
                console.error(`Error deleting student with ID ${studentIdToDelete}:`, error);
            }
        }
        handledelClose();
    };
    
    

    const handleChange = (e) => {
        setEditedStudent({
            ...editedStudent,
            [e.target.name]: e.target.value,
        });
    };

    const handleDelClickOpen = (studentId) => {
        setStudentIdToDelete(studentId);
        setdelOpen(true);
    };

    const handledelClose = () => {
        setdelOpen(false);
        setStudentIdToDelete(null);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="student-table-container">
            <h2 className="table-heading">Student Details</h2>
            <table className="student-table">
                <thead>
                    <tr className="table-header">
                    <th className="table-header-cell">Student ID</th>
                        <th className="table-header-cell">Name</th>
                        <th className="table-header-cell">Email</th>
                        <th className="table-header-cell">Contact Details</th>
                        <th className="table-header-cell">Batch ID</th>
                        <th className="table-header-cell">Batch Name</th>
                        <th className="table-header-cell">Batch Timing</th>
                        <th className="table-header-cell">Batch Type</th>
                        <th className="table-header-cell">Course Name</th>
                        <th className="table-header-cell">Course Description</th>
                        <th className="table-header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.studentId} className="table-row">
                            <td className="table-cell">{student.studentId}</td>
                            <td className="table-cell">{student.user?.name || "N/A"}</td>
                            <td className="table-cell">{student.user?.email || "N/A"}</td>
                            <td className="table-cell">{student.user?.contactDetails || "N/A"}</td>
                            <td className="table-cell">{student?.batchId || "N/A"}</td> {/* Batch ID */}
                            <td className="table-cell">{student.batch?.batchName || "N/A"}</td>
                            <td className="table-cell">{student.batch?.batchTiming || "N/A"}</td>
                            <td className="table-cell">{student.batch?.batchType || "N/A"}</td>
                            <td className="table-cell">{student.batch?.course?.courseName || "N/A"}</td>
                            <td className="table-cell">{student.batch?.course?.description || "N/A"}</td>
                            <td className="table-cell">
                                <button className="action-button" onClick={() => handleEdit(student)}>Edit</button>
                                <button className="action-button" onClick={() => handleDelClickOpen(student.studentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dialog for Editing Student */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update student details below.</DialogContentText>
                    <TextField label="Name" name="name" fullWidth value={editedStudent.name} onChange={handleChange} className="Studenteditinput"/>
                    <TextField label="Email" name="email" fullWidth value={editedStudent.email} onChange={handleChange} className="Studenteditinput"/>
                    <TextField label="Contact Details" name="contactDetails" fullWidth value={editedStudent.contactDetails} onChange={handleChange} className="Studenteditinput"/>
                    <TextField label="Batch Id" name="batchId" fullWidth value={editedStudent.batchId} onChange={handleChange} className="Studenteditinput"/>
                    {/* <TextField label="Batch Name" name="batchName" fullWidth value={editedStudent.batchName} onChange={handleChange} className="Studenteditinput"/> */}
                    {/* <TextField label="Batch Timing" name="batchTiming" fullWidth value={editedStudent.batchTiming} onChange={handleChange} className="Studenteditinput"/> */}
                    {/* <TextField label="Batch Type" name="batchType" fullWidth value={editedStudent.batchType} onChange={handleChange} className="Studenteditinput"/> */}
                    {/* <TextField label="Course Name" name="courseName" fullWidth value={editedStudent.courseName} onChange={handleChange} className="Studenteditinput"/> */}
                    {/* <TextField label="Course Description" name="courseDescription" fullWidth value={editedStudent.courseDescription} onChange={handleChange} className="Studenteditinput" /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

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

export default StudentTable;
