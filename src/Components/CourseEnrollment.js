import React, { useState, useEffect } from "react";

const CourseEnrollment = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    };

    const fetchEnrolledCourses = async () => {
      const response = await fetch("/api/student/courses");
      const data = await response.json();
      setEnrolledCourses(data);
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const handleEnroll = async (course_id) => {
    const response = await fetch(`/api/student/enroll/${course_id}`, {
      method: "POST",
    });
    if (response.ok) {
      setEnrolledCourses([...enrolledCourses, course_id]);
    }
  };

  return (
    <div className="course-enrollment">
      <h3>Available Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            {course.course_name}
            {!enrolledCourses.includes(course.course_id) ? (
              <button onClick={() => handleEnroll(course.course_id)}>Enroll</button>
            ) : (
              <span>Enrolled</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseEnrollment;
