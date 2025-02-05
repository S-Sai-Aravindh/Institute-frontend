import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch teacher profile data
    const fetchTeacherData = async () => {
      const response = await fetch("/api/teacher/profile");
      const data = await response.json();
      setTeacher(data);
      setCourses(data.courses);
    };

    fetchTeacherData();
  }, []);

  return (
    <div className="teacher-dashboard">
      TeacherDashboard
      {teacher && (
        <>
          <h2>{teacher.name}'s Profile</h2>
          <p>Email: {teacher.email}</p>
          <p>Specialization: {teacher.subject_specialization}</p>

          <h3>Courses Managed:</h3>
          <ul>
            {courses.map((course) => (
              <li key={course.course_id}>
                {course.course_name}
                <Link to={`/teacher/course/${course.course_id}`} className="button">
                  Manage Course
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/teacher/courses/create" className="button">
            Create New Course
          </Link>
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;
