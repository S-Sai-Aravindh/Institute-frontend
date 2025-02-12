import React, { useEffect, useState } from "react";

const Enrollreq = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5109/api/enrollrequest") // Update with your API URL
      .then((response) => response.json())
      .then((data) => {setContacts(data)
        console.log("Enroll:",contacts);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  return (
    <div className="course-management-container">
      <h2 className="table-heading">Enrollment Requests</h2>
      <table className="course-table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">S. No</th>
            <th className="table-header-cell">Student ID</th>
            <th className="table-header-cell">Course ID</th>
            <th className="table-header-cell">Course Name</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact ,index) => (
              <tr key={contact.id} className="table-cell">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{contact.studentId}</td>
                <td className="table-cell">{contact.courseId}</td>
                <td className="table-cell">{contact.courseName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollreq;
