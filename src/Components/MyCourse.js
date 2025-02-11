import React, { useState, useEffect } from "react";
import axios from "axios";

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const studentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5109/api/student/${studentId}`);
        if (response.data && response.data.enrollments) {
          setCourses(response.data.enrollments.map((enrollment) => enrollment.course));
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchStudentCourses();
  }, [studentId]);

  return (
    <div className="my-courses-container">
      <h2>My Courses</h2>
      {courses.length > 0 ? (
        <table className="courses-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Teacher Name</th>
              <th>Specialization</th>
              <th>Contact Details</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                <td>{course.courseName}</td>
                <td>{course.description}</td>
                <td>{course.teacher?.user?.name || "N/A"}</td>
                <td>{course.teacher?.subjectSpecialization || "N/A"}</td>
                <td>{course.teacher?.user?.contactDetails || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses enrolled yet.</p>
      )}
    </div>
  );
};

export default MyCourse;
