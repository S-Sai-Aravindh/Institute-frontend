// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import "./Style.css";

// const TeacherTable = () => {
//     const [teachers, setTeachers] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [delopen, setDelOpen] = useState(false);
//     const [teacherIdToDelete, setTeacherIdToDelete] = useState(null);
//     const [editedTeacher, setEditedTeacher] = useState({
//         teacherId: "",
//         name: "",
//         email: "",
//         contactDetails: "",
//         subjectSpecialization: "",
//         courses: "",
//     });

//     useEffect(() => {
//         axios
//             .get("http://localhost:5109/api/admin/teachers")
//             .then((response) => setTeachers(response.data))
//             .catch((error) => console.error("Error fetching teachers:", error));
//     }, []);

//     const handleEdit = (teacher) => {
//         setEditedTeacher({
//             teacherId: teacher.teacherId,
//             name: teacher.user?.name || "",
//             email: teacher.user?.email || "",
//             contactDetails: teacher.user?.contactDetails || "",
//             subjectSpecialization: teacher.subjectSpecialization || "",
//             courses: teacher.courses || "",
//         });
//         setOpen(true);
//     };

//     const handleSave = async () => {
//         if (!editedTeacher.teacherId) {
//             console.error("Teacher ID is required for update");
//             return;
//         }
    
//         const dataToSend = {
//             teacherId: editedTeacher.teacherId,
//             user: {
//                 userId: editedTeacher.userId, // Ensure this is correct
//                 name: editedTeacher.name,
//                 email: editedTeacher.email,
//                 contactDetails: editedTeacher.contactDetails,
//                 role: "Teacher", // If role is static as "Teacher"
//             },
//             subjectSpecialization: editedTeacher.subjectSpecialization,
//             courses: editedTeacher.courses || null, // If courses can be null
//         };
    
//         console.log("Data to be sent:", dataToSend);
    
//         try {
//             const response = await axios.put(
//                 `http://localhost:5109/api/admin/teachers/${editedTeacher.teacherId}`,
//                 dataToSend
//             );
    
//             // Update the frontend table with new data
//             setTeachers((prevTeachers) =>
//                 prevTeachers.map((teacher) =>
//                     teacher.teacherId === editedTeacher.teacherId
//                         ? { ...teacher, ...response.data }
//                         : teacher
//                 )
//             );
//             window.location.reload(); 
//             setOpen(false);
//         } catch (error) {
//             console.error("Error saving teacher data:", error);
//         }
//     };
    

//     const handleConfirmDelete = async () => {
//         if (teacherIdToDelete) {
//             try {
//                 await axios.delete(`http://localhost:5109/api/admin/teachers/${teacherIdToDelete}`);
//                 setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.teacherId !== teacherIdToDelete));
//             } catch (error) {
//                 console.error(`Error deleting teacher with ID ${teacherIdToDelete}:`, error);
//             }
//         }
//         handleDelClose();
//     };

//     const handleChange = (e) => {
//         setEditedTeacher({
//             ...editedTeacher,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleDelClickOpen = (teacherId) => {
//         setTeacherIdToDelete(teacherId);
//         setDelOpen(true);
//     };

//     const handleDelClose = () => {
//         setDelOpen(false);
//         setTeacherIdToDelete(null);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div className="teacher-table-container">
//             <h2 className="table-heading">Teacher Details</h2>
//             <table className="teacher-table">
//                 <thead>
//                     <tr className="table-header">
//                         <th className="table-header-cell">Teacher ID</th>
//                         <th className="table-header-cell">Name</th>
//                         <th className="table-header-cell">Email</th>
//                         <th className="table-header-cell">Contact Details</th>
//                         <th className="table-header-cell">Subject Specialization</th>
//                         <th className="table-header-cell">Courses</th>
//                         <th className="table-header-cell">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {teachers.map((teacher) => (
//                         <tr key={teacher.teacherId} className="table-row">
//                             <td className="table-cell">{teacher.teacherId}</td>
//                             <td className="table-cell">{teacher.user?.name || "N/A"}</td>
//                             <td className="table-cell">{teacher.user?.email || "N/A"}</td>
//                             <td className="table-cell">{teacher.user?.contactDetails || "N/A"}</td>
//                             <td className="table-cell">{teacher.subjectSpecialization || "N/A"}</td>
//                             <td className="table-cell">{teacher.courses || "N/A"}</td>
//                             <td className="table-cell">
//                                 <button className="action-button" onClick={() => handleEdit(teacher)}>Edit</button>
//                                 <button className="action-button" onClick={() => handleDelClickOpen(teacher.teacherId)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Dialog for Editing Teacher */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Edit Teacher Details</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>Update teacher details below.</DialogContentText>
//                     <TextField label="Name" name="name" fullWidth value={editedTeacher.name} onChange={handleChange} className="TeacherEditInput"/>
//                     <TextField label="Email" name="email" fullWidth value={editedTeacher.email} onChange={handleChange} className="TeacherEditInput"/>
//                     <TextField label="Contact Details" name="contactDetails" fullWidth value={editedTeacher.contactDetails} onChange={handleChange} className="TeacherEditInput"/>
//                     <TextField label="Subject Specialization" name="subjectSpecialization" fullWidth value={editedTeacher.subjectSpecialization} onChange={handleChange} className="TeacherEditInput"/>
//                     <TextField label="Courses" name="courses" fullWidth value={editedTeacher.courses} onChange={handleChange} className="TeacherEditInput"/>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSave}>Save</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Dialog for Deleting Teacher */}
//             <Dialog open={delopen} onClose={handleDelClose}>
//                 <DialogTitle>Confirm Deletion</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you want to delete? This action cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDelClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleConfirmDelete} color="error" autoFocus>
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default TeacherTable;


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

const TeacherTable = () => {
    const [teachers, setTeachers] = useState([]);
    const [open, setOpen] = useState(false);
    const [editedTeacher, setEditedTeacher] = useState({
        teacherId: "",
        name: "",
        email: "",
        contactDetails: "",
        subjectSpecialization: "",
        courses: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:5109/api/admin/teachers")
            .then((response) => setTeachers(response.data))
            .catch((error) => console.error("Error fetching teachers:", error));
    }, []);

    const handleEdit = (teacher) => {
        setEditedTeacher({
            teacherId: teacher.teacherId,
            name: teacher.user?.name || "",
            email: teacher.user?.email || "",
            contactDetails: teacher.user?.contactDetails || "",
            subjectSpecialization: teacher.subjectSpecialization || "",
            courses: teacher.courses || "",
        });
        setOpen(true);
    };

    const handleSave = async () => {
        if (!editedTeacher.teacherId) {
            console.error("Teacher ID is required for update");
            return;
        }
    
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
            courses: editedTeacher.courses || null, // If courses can be null
        };
    
        console.log("Data to be sent:", dataToSend);
    
        try {
            const response = await axios.put(
                `http://localhost:5109/api/admin/teachers/${editedTeacher.teacherId}`,
                dataToSend
            );
    
            // Update the frontend table with new data
            setTeachers((prevTeachers) =>
                prevTeachers.map((teacher) =>
                    teacher.teacherId === editedTeacher.teacherId
                        ? { ...teacher, ...response.data }
                        : teacher
                )
            );
            window.location.reload(); 
            setOpen(false);
        } catch (error) {
            console.error("Error saving teacher data:", error);
        }
    };

    const handleChange = (e) => {
        setEditedTeacher({
            ...editedTeacher,
            [e.target.name]: e.target.value,
        });
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
                            <td className="table-cell">{teacher.courses || "N/A"}</td>
                            <td className="table-cell">
                                <button className="teacheraction-button" onClick={() => handleEdit(teacher)}>Edit</button>
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
                    <TextField label="Name" name="name" fullWidth value={editedTeacher.name} onChange={handleChange} className="TeacherEditInput"/>
                    <TextField label="Email" name="email" fullWidth value={editedTeacher.email} onChange={handleChange} className="TeacherEditInput"/>
                    <TextField label="Contact Details" name="contactDetails" fullWidth value={editedTeacher.contactDetails} onChange={handleChange} className="TeacherEditInput"/>
                    <TextField label="Subject Specialization" name="subjectSpecialization" fullWidth value={editedTeacher.subjectSpecialization} onChange={handleChange} className="TeacherEditInput"/>
                    <TextField label="Courses" name="courses" fullWidth value={editedTeacher.courses} onChange={handleChange} className="TeacherEditInput"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TeacherTable;
