import { useEffect, useState } from "react";
import axios from "axios";

const StudentManagement = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5109/api/students")
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));
    }, []);

    return (
        <div>
            <h2>Manage Students</h2>
            <button onClick={() => {/* Open Add Student Modal */}}>Add Student</button>
            <ul>
                {students.map(student => (
                    <li key={student.student_id}>
                        {student.name} - {student.batch_id}
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentManagement;
