import { useEffect, useState } from "react";
import axios from "axios";

const BatchManagement = () => {
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5109/api/batches")
            .then(response => setBatches(response.data))
            .catch(error => console.error("Error fetching batches:", error));
    }, []);

    return (
        <div>
            <h2>Manage Batches</h2>
            <button onClick={() => {/* Open Add Batch Modal */}}>Add Batch</button>
            <ul>
                {batches.map(batch => (
                    <li key={batch.batch_id}>
                        {batch.batch_name} - Course: {batch.course_id}
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BatchManagement;
