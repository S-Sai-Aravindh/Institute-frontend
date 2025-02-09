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
        courseName: "",
        teacherName: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:5109/api/admin/batches")
            .then((response) => setBatches(response.data))
            .catch((error) => console.error("Error fetching batches:", error));
    }, []);

    const handleEdit = (batch) => {
        setEditedBatch({
            batchId: batch.batchId,
            batchName: batch.batchName,
            batchTiming: batch.batchTiming,
            batchType: batch.batchType,
            courseName: batch.course.courseName,
            teacherName: batch.course.teacher.user.name,
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
            courseName: editedBatch.courseName,
            teacherName: editedBatch.teacherName,
        };

        try {
            await axios.put(
                `http://localhost:5109/api/admin/batches/${editedBatch.batchId}`,
                dataToSend
            );

            // Fetch updated batch data from the backend
            const response = await axios.get("http://localhost:5109/api/admin/batches");
            setBatches(response.data);

            setOpen(false);
        } catch (error) {
            console.error("Error saving batch data:", error);
        }
    };

    const handleDelete = (batchId) => {
        axios
            .delete(`http://localhost:5109/api/admin/batches/${batchId}`)
            .then(() => {
                setBatches((prevBatches) =>
                    prevBatches.filter((batch) => batch.batchId !== batchId)
                );
            })
            .catch((error) => console.error("Error deleting batch:", error));
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
        <div>
            <h2>Manage Batches</h2>
            <button onClick={() => {/* Open Add Batch Modal */}}>Add Batch</button>
            <table>
    <thead>
        <tr className="table-header">
            <th className="table-header-cell">Batch ID</th>
            <th className="table-header-cell">Batch Name</th>
            <th className="table-header-cell">Batch Timing</th>
            <th className="table-header-cell">Batch Type</th>
            <th className="table-header-cell">Course Name</th>
            <th className="table-header-cell">Teacher</th>
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
                <td className="table-cell">{batch.course.teacher.user.name}</td>
                <td className="table-cell">
                    <button className="action-button" onClick={() => handleEdit(batch)}>Edit</button>
                    <button className="action-button" onClick={() => handleDelete(batch.batchId)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>



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
                        label="Course Name"
                        name="courseName"
                        fullWidth
                        value={editedBatch.courseName}
                        onChange={handleChange}
                        className="Studenteditinput"
                    />
                    <TextField
                        label="Teacher Name"
                        name="teacherName"
                        fullWidth
                        value={editedBatch.teacherName}
                        onChange={handleChange}
                        className="Studenteditinput"
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

export default BatchManagement;
