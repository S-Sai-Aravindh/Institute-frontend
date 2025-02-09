import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Style.css'

export default function AdminDashboard() {
  const [adminData, setAdminData] = React.useState(null);
  const [open, setOpen] = React.useState(false); // State for opening/closing the dialog
  const [editedData, setEditedData] = React.useState({
    name: '',
    email: '',
    role: '',
    contactDetails: ''
  });
  const [adminId, setAdminId] = React.useState(null); // State for storing admin id
  const token = sessionStorage.getItem('authToken');

  React.useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:5109/api/auth/admin-data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminData(response.data);
        setAdminId(response.data.userId);  // Store admin ID
        console.log("ID: ",response.data);
        setEditedData({
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          contactDetails: response.data.user.contactDetails,
        });
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    if (token) fetchAdminData();
  }, [token]);

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!adminId) {
      console.error('Admin ID is required for update');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5109/api/auth/${adminId}`, editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminData(response.data);
      sessionStorage.setItem('name', response.data.user.name);
      window.location.reload();
      setOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Error saving admin data:', error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      {adminData ? (
        <div>
          <h1 className='my-details-title'>My Details</h1>
        <div className="admin-details">
        <p className="admin-detail-item"><strong>Name </strong> <span>{adminData.user.name}</span></p>
        <p className="admin-detail-item"><strong>Email</strong> <span>{adminData.user.email}</span></p>
        <p className="admin-detail-item"><strong>Role</strong> <span>{adminData.user.role}</span></p>
        <p className="admin-detail-item"><strong>Contact Details</strong> <span>{adminData.user.contactDetails}</span></p>
          <Button variant="outlined" onClick={handleClickOpen} className='adminEditbutton'>Edit</Button>
        </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}

      {/* Material-UI Dialog for editing */}
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the details, please edit the fields below.
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
            id="role"
            name="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            value={editedData.role}
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
          <Button
            onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              handleSave();  // Call your save function here
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
