// MultipleSelectCheckmarks.js
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const courseNames = [
//   'Mathematics',
//   'Science',
//   'English',
//   'History',
//   'Art',
//   'Computer Science',
//   // Add the rest of the available courses here
// ];

export default function MultipleSelectCheckmarks({ personName =[], setPersonName, availableCourses }) {
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;

      setPersonName(value);
    };
  
    return (
      <FormControl sx={{ m: 1, width: 300 }} className="TeacherCheckboxEditInput">
        <InputLabel id="multiple-checkbox-label">Courses</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={personName} // Convert the string to an array
          onChange={handleChange}
          input={<OutlinedInput label="Courses" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {availableCourses.map((name) => ( 
                    <MenuItem key={name} value={name}> 
                        <Checkbox checked={personName.indexOf(name) > -1} /> 
                        <ListItemText primary={name} /> 
                    </MenuItem> 
                ))}
        </Select>
      </FormControl>
    );
  }