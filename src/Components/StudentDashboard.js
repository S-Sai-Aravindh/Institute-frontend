import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    // Fetch student profile data
    const fetchStudentData = async () => {
      const response = await fetch("/api/student/profile");
      const data = await response.json();
      setStudent(data);
      setCourses(data.enrolled_courses);
      setBatch(data.batch);
    };

    fetchStudentData();
  }, []);

  return (
    <div className="student-dashboard">
        StudentDashboard

      {student && (
        <>
          <h2>{student.name}'s Profile</h2>
          <p>Email: {student.email}</p>
          <p>Contact: {student.contact_details}</p>

          <h3>Enrolled Courses:</h3>
          <ul>
            {courses.map((course) => (
              <li key={course.course_id}>{course.course_name}</li>
            ))}
          </ul>

          <h3>Batch Information:</h3>
          <p>Batch: {batch.batch_name}</p>

          <Link to="/student/courses" className="button">
            Enroll in Courses
          </Link>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
