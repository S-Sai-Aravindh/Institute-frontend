import React, { useEffect, useState } from "react";

const TeachCourseList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5109/api/admin/courses");
        const data = await response.json();

        // Get teacherId from sessionStorage
        const storedTeacherId = sessionStorage.getItem("teacherId");

        if (!storedTeacherId) {
          console.error("No teacherId found in sessionStorage.");
          return;
        }

        const teacherId = parseInt(storedTeacherId, 10);

        // Filter courses by teacherId and extract students
        const filteredStudents = data
          .filter(course => course.teacher.teacherId === teacherId) // Match teacherId
          .flatMap(course => course.enrollment ? [course.enrollment.student] : []) // Extract students
          .filter(student => student && student.user.role === "Student"); // Ensure valid students

        setStudents(filteredStudents);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2 className="table-heading">Student List</h2>
      <table className="course-table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">S. No</th>
            <th className="table-header-cell">Student ID</th>
            <th className="table-header-cell">Name</th>
            <th className="table-header-cell">Email</th>
            <th className="table-header-cell">Contact</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student,index) => (
              <tr key={student.user.userId} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{student.user.userId}</td>
                <td className="table-cell">{student.user.name}</td>
                <td className="table-cell">{student.user.email}</td>
                <td className="table-cell">{student.user.contactDetails}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeachCourseList;
