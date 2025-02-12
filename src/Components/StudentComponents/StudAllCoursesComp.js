import React, { useEffect, useState } from "react";

const StudAllCoursesComp = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5109/api/admin/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div className="course-management-container">
      <h2 className="table-heading">Course List</h2>
      <table  className="course-table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">S.No</th>
            <th className="table-header-cell">Course ID</th>
            <th className="table-header-cell">Course Name</th>
            <th className="table-header-cell">Description</th>
            <th className="table-header-cell">Teacher Name</th>
            <th className="table-header-cell">Teacher Email</th>
            <th className="table-header-cell">Contact Details</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.courseId} className="table-row">
              <td className="table-cell">{index + 1}</td>
              <td className="table-cell">{course.courseId}</td>
              <td className="table-cell">{course.courseName}</td>
              <td className="table-cell">{course.description}</td>
              <td className="table-cell">{course.teacher?.user?.name || "N/A"}</td>
              <td className="table-cell">{course.teacher?.user?.email || "N/A"}</td>
              <td className="table-cell">{course.teacher?.user?.contactDetails || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudAllCoursesComp;
