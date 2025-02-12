import React, { useEffect, useState } from "react";

const QueryTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5109/api/contact") // Update with your API URL
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  return (
    <div className="course-management-container">
      <h2 className="table-heading">Contact Queries</h2>
      <table className="course-table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">ID</th>
            <th className="table-header-cell">Name</th>
            <th className="table-header-cell">Email</th>
            <th className="table-header-cell">Contact</th>
            <th className="table-header-cell">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.id} className="table-cell">
                <td className="table-cell">{contact.id}</td>
                <td className="table-cell">{contact.name}</td>
                <td className="table-cell">{contact.email}</td>
                <td className="table-cell">{contact.contact}</td>
                <td className="table-cell">{contact.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No queries found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable;
