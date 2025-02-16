import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css"

const NewTeacherComp = () => {
  const [teachers, setTeachers] = useState([]);

  // Fetch teachers on component mount
  useEffect(() => {
    fetch("http://localhost:5109/api/newteacher") // Update with your actual API URL if needed
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle the authorize action with a POST request
  const handleAuthorize = (teacher) => {

    console.log("teacher selected:" , teacher)

    axios
      .post("http://localhost:5109/api/auth/newregister", teacher)
      .then((response) => {
        console.log("Teacher authorized:", response.data);
        alert("Teacher authorized successfully")
        // Optionally update your UI or state after a successful post.
      })
      .catch((error) => {
        console.error("Error authorizing teacher:", error);
      });
  };

  return (
    <div className="course-management-container">
      <h2 className="table-heading">Teachers List</h2>
      <table className="course-table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">ID</th>
            <th className="table-header-cell">Name</th>
            <th className="table-header-cell">Email</th>
            <th className="table-header-cell">Role</th>
            <th className="table-header-cell">Contact</th>
            <th className="table-header-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="table-cell">
              <td className="table-cell">{teacher.id}</td>
              <td className="table-cell">{teacher.name}</td>
              <td className="table-cell">{teacher.email}</td>
              <td className="table-cell">{teacher.role}</td>
              <td className="table-cell">{teacher.contactDetails}</td>
              <td className="table-cell">
                <button onClick={() => handleAuthorize(teacher)} className="Authbutton">
                  Authorize
                </button>
              </td>
            </tr>
          ))
          
          }
        </tbody>
      </table>
    </div>
  );
};

export default NewTeacherComp;
