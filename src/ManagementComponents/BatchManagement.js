import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BatchManagement = () => {
    const [batches, setBatches] = useState([]);
    const [open, setOpen] = useState(false);
    const [editedBatch, setEditedBatch] = useState({
        batchId: "",
        batchName: "",
        batchTiming: "",
        batchType: "",
        courseId: "",
        teacherId: "",

    });

    // create batch start 

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [batchValues, setBatchValues] = useState({
        batchName: "",
        batchTiming: "",
        batchType: "",
        courseId: "",
        teacherId: "",
    });

    const handleCreateOpen = () => {
        setIsDialogOpen(true);
    };

    const handleCreateClose = () => {
        setIsDialogOpen(false);
    };

    const handleCreateChange = (event) => {
        const { name, value } = event.target;
        setBatchValues({ ...batchValues, [name]: value });
    };

    const handleCreateSave = async (event) => {
    event.preventDefault();

    // Check if required fields are missing
    if (!batchValues.batchName || !batchValues.batchTiming || !batchValues.batchType || !batchValues.courseId || !batchValues.teacherId) {
        console.error("All fields are required");
        return;
    }

    const dataToSend = {
        batchName: batchValues.batchName,
        batchTiming: batchValues.batchTiming,
        batchType: batchValues.batchType,
        course:{
        courseId: batchValues.courseId,  // Ensure it's a valid ID, not course name
        teacher:{
            teacherId: batchValues.teacherId
        }
    },  // Ensure it's a valid ID, not teacher name
    };
    try {
        const response = await axios.post("http://localhost:5109/api/admin/batches", dataToSend);
        console.log("Batch created:", response.data);

        setBatches([...batches, response.data]);
        setIsDialogOpen(false);
        setBatchValues({ batchName: "", batchTiming: "", batchType: "", courseId: "", teacherId: "" });
    } catch (error) {
        console.error("Error creating batch:", error.response ? error.response.data : error.message);
        if (error.response && error.response.data) {
            alert("Error: " + error.response.data.message || "Invalid course or teacher data.");
        }
    }
};

    


    // create batch end 


    useEffect(() => {
        axios
            .get("http://localhost:5109/api/admin/batches")
            .then((response) => {setBatches(response.data)
                console.log("Batch details: ",response.data)
            })
            .catch((error) => console.error("Error fetching batches:", error));
    }, []);

    const handleEdit = (batch) => {
        setEditedBatch({
            batchId: batch.batchId,
            batchName: batch.batchName,
            batchTiming: batch.batchTiming,
            batchType: batch.batchType,
            courseId: batch.course.courseId,  // Store courseId instead of courseName
            teacherId: batch.course.teacher.teacherId,
        });
        setOpen(true);
    };
    

    const handleSave = async () => {
        if (!editedBatch.batchId) {
            console.error("Batch ID is required for update");
            return;
        }
    
        const dataToSend = {
            batchId: editedBatch.batchId,
            batchName: editedBatch.batchName,
            batchTiming: editedBatch.batchTiming,
            batchType: editedBatch.batchType,
            courseId: editedBatch.courseId,  // Send courseId, not courseName  // Send courseId, not courseName
        };
    
        try {
            await axios.put(
                `http://localhost:5109/api/admin/batches/${editedBatch.batchId}`,
                dataToSend
            );

            console.log("response send",dataToSend)
    
            // Refresh batch data after update
            const response = await axios.get("http://localhost:5109/api/admin/batches");
            setBatches(response.data);
    
            setOpen(false);
        } catch (error) {
            console.error("Error saving batch data:", error);
        }
    };
    
    const handleDelete = (batchId) => {
        if (window.confirm("Are you sure you want to delete this batch?")) {
            axios
                .delete(`http://localhost:5109/api/admin/batches/${batchId}`)
                .then(() => {
                    // Remove the batch from the UI after successful deletion
                    setBatches((prevBatches) =>
                        prevBatches.filter((batch) => batch.batchId !== batchId)
                    );
                    alert("Batch deleted successfully.");
                })
                .catch((error) => {
                    console.error("Error deleting batch:", error);
                    alert("Failed to delete the batch. Please try again.");
                });
        }
    };
    

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setEditedBatch({
            ...editedBatch,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="course-management-container">
            <h2 className="table-heading">Manage Batches</h2>
            <button className="create-course-btn" onClick={handleCreateOpen}>Create Batch</button>
            <table className="course-table">
    <thead>
        <tr className="table-header">
            <th className="table-header-cell">Batch ID</th>
            <th className="table-header-cell">Batch Name</th>
            <th className="table-header-cell">Batch Timing</th>
            <th className="table-header-cell">Batch Type</th>
            <th className="table-header-cell">Course Name</th>
            <th className="table-header-cell">Teacher ID</th>
            <th className="table-header-cell">Teacher Assigned</th>
            <th className="table-header-cell">Action</th>
        </tr>
    </thead>
    <tbody>
        {batches.map((batch) => (
            <tr key={batch.batchId} className="table-row">
                <td className="table-cell">{batch.batchId}</td>
                <td className="table-cell">{batch.batchName}</td>
                <td className="table-cell">{batch.batchTiming}</td>
                <td className="table-cell">{batch.batchType}</td>
                <td className="table-cell">{batch.course.courseName}</td>
                <td className="table-cell">{batch.course.teacher.teacherId}</td>
                <td className="table-cell">{batch.course.teacher.user.name}</td>
                <td className="table-cell" >
                    <button className="action-button" onClick={() => handleEdit(batch)}>Edit</button>
                    <button className="action-button" onClick={() => handleDelete(batch.batchId)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>    

        {/* dialog for create batch  */}

        <Dialog open={isDialogOpen} onClose={handleCreateClose}>
                <DialogTitle>Create Batch</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter batch details below.</DialogContentText>
                    <TextField label="Batch Name" name="batchName" fullWidth value={batchValues.batchName} onChange={handleCreateChange} className="Studenteditinput"/>
                    <TextField label="Batch Timing" name="batchTiming" fullWidth value={batchValues.batchTiming} onChange={handleCreateChange} className="Studenteditinput"/>
                    <TextField label="Batch Type" name="batchType" fullWidth value={batchValues.batchType} onChange={handleCreateChange} className="Studenteditinput"/>
                    <TextField label="Course ID" name="courseId" fullWidth value={batchValues.courseId} onChange={handleCreateChange} className="Studenteditinput"/>
                    <TextField label="Teacher ID" name="teacherId" fullWidth value={batchValues.teacherId} onChange={handleCreateChange} className="Studenteditinput"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button onClick={handleCreateSave}>Save</Button>
                </DialogActions>
            </Dialog>



            {/* Dialog for Editing Batch */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Batch Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update batch details below.</DialogContentText>
                    <TextField
                        label="Batch Name"
                        name="batchName"
                        fullWidth
                        value={editedBatch.batchName}
                        onChange={handleChange}
                        className="Studenteditinput"
                    />
                    <TextField
                        label="Batch Timing"
                        name="batchTiming"
                        fullWidth
                        value={editedBatch.batchTiming}
                        onChange={handleChange}
                        className="Studenteditinput"
                    />
                    <TextField
                        label="Batch Type"
                        name="batchType"
                        fullWidth
                        value={editedBatch.batchType}
                        onChange={handleChange}
                        className="Studenteditinput"
                    />
                    <TextField
                        label="Course Id"
                        name="courseId"
                        fullWidth
                        value={editedBatch.courseId}
                        onChange={handleChange}
                        className="Studenteditinput"
                    />
                    {/* <TextField
                        label="Teacher ID"
                        name="teacherId"
                        fullWidth
                        value={editedBatch.teacherId}
                        onChange={handleChange}
                        className="Studenteditinput"
                    /> */}
                    {/* <TextField
                        label="Teacher Name"
                        name="teacherName"
                        fullWidth
                        value={editedBatch.teacherName}
                        onChange={handleChange}
                        className="Studenteditinput"
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BatchManagement;
