import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const ManageCourse = () => {
  const { course_id } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch course and student data
    const fetchCourseData = async () => {
      const response = await fetch(`/api/course/${course_id}`);
      const data = await response.json();
      setCourse(data);
      setStudents(data.students);
    };

    fetchCourseData();
  }, [course_id]);

  const handleDelete = async () => {
    const response = await fetch(`/api/course/${course_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      history.push("/teacher/dashboard");
    }
  };

  return (
    <div className="manage-course">
      {course && (
        <>
          <h2>{course.course_name}</h2>
          <p>{course.description}</p>

          <h3>Enrolled Students:</h3>
          <ul>
            {students.map((student) => (
              <li key={student.student_id}>{student.name}</li>
            ))}
          </ul>

          <button onClick={handleDelete}>Delete Course</button>
        </>
      )}
    </div>
  );
};

export default ManageCourse;
