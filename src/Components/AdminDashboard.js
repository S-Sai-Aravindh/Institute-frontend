import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Style.css';

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

export default function AdminDashboard() {
  const [adminData, setAdminData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [editedData, setEditedData] = React.useState({
    name: '',
    email: '',
    role: '',
    contactDetails: ''
  });
  const [adminId, setAdminId] = React.useState(null);
  const [errors, setErrors] = React.useState({});
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
        setAdminId(response.data.userId);
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
    // Clear the error message for the corresponding field
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
    if (!adminId) {
      console.error('Admin ID is required for update');
      return;
    }

    if (!validateForm()) {
      return; // Prevent save if validation failed
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
          <Button
            onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              handleSave();  // Call save function
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}