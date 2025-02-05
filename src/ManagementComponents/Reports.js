import { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5109/api/reports")
            .then(response => setReportData(response.data))
            .catch(error => console.error("Error fetching reports:", error));
    }, []);

    return (
        <div>
            <h2>Reports</h2>
            <ul>
                {reportData.map(report => (
                    <li key={report.id}>{report.title}: {report.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;
