import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";

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
    <div className="mycourse-container">
      <h2 className="mycourse-heading">My Courses</h2>
      {courses.length > 0 ? (
        <div className="mycourse-list">
          {courses.map((course) => (
            <div key={course.courseId} className="mycourse-card">
              <h3 className="mycourse-title">{course.courseName}</h3>
              <p className="mycourse-description">{course.description}</p>
              <div className="mycourse-teacher-info">
                <h4 className="mycourse-teacher-name">Instructor: {course.teacher?.user?.name || "N/A"}</h4>
                <p className="mycourse-specialization">Specialization: {course.teacher?.subjectSpecialization || "N/A"}</p>
                <p className="mycourse-contact">Contact: {course.teacher?.user?.contactDetails || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mycourse-empty">No courses enrolled yet.</p>
      )}
    </div>
  );
};

export default MyCourse;
