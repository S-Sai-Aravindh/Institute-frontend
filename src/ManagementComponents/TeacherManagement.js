import { useEffect, useState } from "react";
import axios from "axios";

const TeacherManagement = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5109/api/teachers")
            .then(response => setTeachers(response.data))
            .catch(error => console.error("Error fetching teachers:", error));
    }, []);

    return (
        <div>
            <h2>Manage Teachers</h2>
            <button onClick={() => {/* Open Add Teacher Modal */}}>Add Teacher</button>
            <ul>
                {teachers.map(teacher => (
                    <li key={teacher.teacher_id}>
                        {teacher.name} - {teacher.subject_specialization}
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherManagement;
