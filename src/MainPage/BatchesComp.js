import React from 'react';

const BatchesComp = () => {
  const batches = [
    { course: "Fullstack with .NET", batchName: "Batch A", timing: "8:00 AM - 9:30 AM", type: "Weekdays" },
    { course: "Fullstack with Python", batchName: "Batch B", timing: "10:00 AM - 11:30 AM", type: "Weekdays" },
    { course: "Software Testing", batchName: "Batch C", timing: "12:00 PM - 1:30 PM", type: "Weekdays" },
    { course: "Frontend with React", batchName: "Batch D", timing: "2:00 PM - 3:30 PM", type: "Weekdays" },
    { course: "DevOps", batchName: "Batch E", timing: "4:00 PM - 5:30 PM", type: "Weekdays" },
    { course: "Salesforce", batchName: "Batch F", timing: "6:00 PM - 7:30 PM", type: "Weekdays" },
    { course: "Cloud Computing", batchName: "Batch G", timing: "8:00 AM - 9:30 AM", type: "Weekend" },
    { course: "Data Analyst", batchName: "Batch H", timing: "10:00 AM - 11:30 AM", type: "Weekend" },
    { course: "Cyber Security", batchName: "Batch I", timing: "12:00 PM - 1:30 PM", type: "Weekend" },
    { course: "Android Development", batchName: "Batch J", timing: "2:00 PM - 3:30 PM", type: "Weekend" },
    { course: "Artificial Intelligence", batchName: "Batch K", timing: "4:00 PM - 5:30 PM", type: "Weekend" },
    { course: "Power BI", batchName: "Batch L", timing: "6:00 PM - 7:30 PM", type: "Weekend" }
  ];

  return (
    <div style={{background:"#FFF8E1"}}>
      <div className="batch-container">
  <h2 className="Batchheader">Batch Schedule for Courses</h2>
  <div className="batch-grid">
    {batches.map((batch, index) => (
      <div className="batch-card" key={index}>
        <h5 className="batch-course-name">{batch.course}</h5>
        <p className="batch-info"><strong>Batch Name:</strong> {batch.batchName}</p>
        <p className="batch-info"><strong>Timing:</strong> {batch.timing}</p>
        <p className="batch-info"><strong>Type:</strong> {batch.type}</p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default BatchesComp;
