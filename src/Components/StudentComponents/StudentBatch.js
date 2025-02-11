import { useEffect, useState } from "react";
import axios from "axios";


const StudentBatch = () => {

  const [batches, setBatches] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5109/api/admin/batches")
            .then((response) => {setBatches(response.data)
                console.log("Batch details: ",response.data)
            })
            .catch((error) => console.error("Error fetching batches:", error));
    }, []);


  return (
    <div>
      <h2 className="table-heading">Batch Details</h2>
            <table className="course-table">
    <thead>
        <tr className="table-header">
            <th className="table-header-cell">Batch ID</th>
            <th className="table-header-cell">Batch Name</th>
            <th className="table-header-cell">Batch Timing</th>
            <th className="table-header-cell">Batch Type</th>
            <th className="table-header-cell">Course Name</th>
            <th className="table-header-cell">Teacher Assigned</th>
            <th className="table-header-cell">Contact Details</th>
        </tr>
    </thead>
    <tbody>
        {batches.map((batch) => (
            <tr key={batch.batchId} className="table-row">
                <td className="table-cell">{batch.batchId}</td>
                <td className="table-cell">{batch.batchName}</td>
                <td className="table-cell">{batch.batchTiming}</td>
                <td className="table-cell">{batch.batchType}</td>
                <td className="table-cell">{batch.course.courseName}</td>
                <td className="table-cell">{batch.course.teacher.user.name}</td>
                <td className="table-cell">{batch.course.teacher.user.contactDetails}</td>
            </tr>
        ))}
    </tbody>
</table>    
    </div>
  )
}

export default StudentBatch