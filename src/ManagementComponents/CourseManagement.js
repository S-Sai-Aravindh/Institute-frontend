import { useEffect, useState } from "react";
import axios from "axios";

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5109/api/courses")
            .then(response => setCourses(response.data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div>
            <h2>Manage Courses</h2>
            <button onClick={() => {/* Open Add Course Modal */}}>Add Course</button>
            <ul>
                {courses.map(course => (
                    <li key={course.course_id}>
                        {course.course_name} - {course.description}
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseManagement;
