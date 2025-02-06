import React, { useState } from 'react';
import fullstackdotnet from "../assets/AllCoursesImages/DotNetImg.jpeg";
import fullstackpython from "../assets/AllCoursesImages/Pythonfullstackimg.jpg";
import softwaretesting from "../assets/AllCoursesImages/SoftwareTesting.jpg";
import FrontendReact from "../assets/AllCoursesImages/React.jpeg";
import DevopsImg from "../assets/AllCoursesImages/Devopsimg.jpg";
import SalesForce from "../assets/AllCoursesImages/Salesforce.jpg";
import cloud from "../assets/AllCoursesImages/cloud-computing.jpg";
import DataAnalyst from "../assets/AllCoursesImages/DataAnalytics.jpg";
import CyberSecurity from "../assets/AllCoursesImages/Cybersecurity.jpg";
import Android from "../assets/AllCoursesImages/Android.jpg";
import AI from "../assets/AllCoursesImages/AI.jpg";
import PowerBI from "../assets/AllCoursesImages/power-bi.jpg";
const AllCoursesComp = () => {
  const courses = [
    {
      name: "Fullstack Development with .NET",
      image: fullstackdotnet,
      batch: "Batch A",
      duration: "4 Months",
      description: "Master fullstack development with .NET.",
      details: "In this course, you will learn to build powerful applications using the .NET framework. Starting with backend development using C#, you'll discover how to create RESTful APIs, manage databases using Entity Framework, and implement business logic. You'll also learn frontend development with React, including concepts like state management and component lifecycle. By the end of the course, you will have a complete understanding of fullstack application development and deployment."
    },
    {
      name: "Fullstack Development with Python",
      image: fullstackpython,
      batch: "Batch B",
      duration: "6 Months",
      description: "Become a full-stack developer using Python.",
      details: "This comprehensive course will teach you how to develop dynamic web applications utilizing Python. You will learn about Django and Flask for backend development, setting up REST APIs, and working with databases like PostgreSQL. In addition, you'll explore frontend technologies such as HTML, CSS, and JavaScript frameworks. The course also covers deploying applications using cloud services and best practices for code management."
    },
    {
      name: "Frontend Development with React",
      image: FrontendReact,
      batch: "Batch D",
      duration: "4 Months",
      description: "Build dynamic web applications with React.",
      details: "Dive into the world of frontend development with React. This course starts with an introduction to React fundamentals such as components, props, and state management. You'll learn to build single-page applications (SPAs) using React Router for navigation and manage application state with Redux. The course also covers working with APIs and deployment practices. By the end, you’ll be capable of building responsive and interactive web applications."
    },
    {
      name: "Software Testing",
      image: softwaretesting,
      batch: "Batch C",
      duration: "3 Months",
      description: "Comprehensive software testing techniques.",
      details: "This course covers both manual and automated software testing methodologies. You'll learn the importance of testing in the software development lifecycle and get hands-on experience with tools like Selenium, JUnit, and TestNG. You'll also cover types of testing such as unit, integration, functional, and performance testing. At the end of this course, you’ll be well-equipped to create and implement effective testing strategies."
    },
    {
      name: "DevOps",
      image: DevopsImg,
      batch: "Batch E",
      duration: "5 Months",
      description: "Master DevOps practices and tools.",
      details: "This course provides you with the knowledge required to adopt DevOps principles. You'll learn about Continuous Integration and Continuous Deployment (CI/CD) using tools like Jenkins, Docker, and Kubernetes. The course also covers infrastructure as code, monitoring applications, and managing cloud infrastructure using services like AWS and Azure. By the end of this course, you will understand how to streamline development and operational processes."
    },
    {
      name: "Salesforce",
      image: SalesForce,
      batch: "Batch F",
      duration: "4 Months",
      description: "Become proficient in Salesforce development and administration.",
      details: "This course focuses on both Salesforce development and administrator skills. You'll learn the Salesforce platform, including Apex programming for backend logic, Visualforce for user interfaces, and Lightning components for modern UI development. The course also covers best practices for managing Salesforce environments and data. By the end of the course, you will be able to customize Salesforce to meet organizational needs."
    },
    {
      name: "Cloud Computing",
      image: cloud,
      batch: "Batch G",
      duration: "5 Months",
      description: "Understand cloud infrastructure and services.",
      details: "Explore the fundamentals of cloud computing, focusing on major service providers such as AWS, Azure, and Google Cloud Platform (GCP). This course covers cloud architecture, deployment methods, and service models (IaaS, PaaS, SaaS). You’ll learn about virtualization technologies, cloud security concerns, and best practices for managing cloud services that can effectively support your organization."
    },
    {
      name: "Data Analyst",
      image: DataAnalyst,
      batch: "Batch H",
      duration: "4 Months",
      description: "Analyze and visualize data effectively.",
      details: "In this course, you'll learn how to collect, clean, and analyze data using tools like Excel, SQL, and Python. You'll explore data visualization tools such as Tableau and Power BI to create interactive dashboards. The course also introduces statistical analysis and business intelligence methodologies, enabling you to make data-driven decisions. By the end, you'll be poised to succeed in a data analyst role."
    },
    {
      name: "Cyber Security",
      image: CyberSecurity,
      batch: "Batch I",
      duration: "5 Months",
      description: "Learn the fundamentals of cyber security.",
      details: "This extensive course dives into the principles of cyber security. You'll learn about types of cyber threats, ethical hacking, and network security. The program covers security protocols, encryption methods, and how to implement security measures to protect sensitive information. Practical exercises and case studies will enable you to understand real-world security challenges and how to combat them effectively."
    },
    {
      name: "Android Development",
      image: Android,
      batch: "Batch J",
      duration: "4 Months",
      description: "Develop robust Android applications.",
      details: "Learn to build Android applications from scratch using Java and Kotlin. This course covers Android Studio, UI/UX design principles, API integrations, and databases with Room. You'll gain experience through hands-on projects, understanding app lifecycle, and persistent data storage mechanisms. By the end of this course, you will be able to publish applications on the Google Play Store."
    },
    {
      name: "Artificial Intelligence (AI)",
      image: AI,
      batch: "Batch K",
      duration: "6 Months",
      description: "Dive into the world of AI and machine learning.",
      details: "This course is designed to introduce you to artificial intelligence and machine learning concepts. You'll learn the foundational principles of AI, including neural networks and supervised vs. unsupervised learning. Python will be used as the primary programming language, and you’ll work on projects involving data preprocessing, model training, and deployment. This course will give you the skills needed in a rapidly growing field."
    },
    {
      name: "Power BI",
      image: PowerBI,
      batch: "Batch L",
      duration: "3 Months",
      description: "Master data visualization with Power BI.",
      details: "In this course, you'll learn how to visualize and analyze data effectively using Power BI. You’ll cover dashboard creation, data modeling, and advanced data visualization techniques. The training involves importing data from various sources, designing interactive reports, and best practices for sharing insights with stakeholders. By the end of this course, you will be capable of transforming raw data into actionable business intelligence reports."
    }
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCardClick = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div style={{background:"#FFF8E1"}} > 
    <div className="container AllCoursesSection">
      <h2 className="text-center mb-5 Exploreheader">Explore Our Courses</h2>
      <div className="row">
        {courses.map((course, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm h-100" onClick={() => handleCardClick(course)}>
              <img src={course.image} className="card-img-top" alt={course.name} />
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text"><strong>Batch:</strong> {course.batch}</p>
                <p className="card-text"><strong>Duration:</strong> {course.duration}</p>

                <div style={{  margin: '10px 0', borderBottom: '2px solid rgb(252, 222, 198)', width: '100%', marginLeft: 'auto', marginRight: 'auto' }} />

                <div style={{justifyItems:"center"}}>
                  <p className="card-text"><strong>Click to Know More</strong></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="modal fade show" style={{ display: 'block' }} aria-hidden="false">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCourse.name}</h5>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6><strong>Description:</strong></h6>
                <p>{selectedCourse.description}</p>
                <h6><strong>Details:</strong></h6>
                <p>{selectedCourse.details}</p>
                <p><strong>Batch:</strong> {selectedCourse.batch}</p>
                <p><strong>Duration:</strong> {selectedCourse.duration}</p>

                <div style={{  justifyContent:"center",display:"flex",flexDirection:"row" }} > 
                  <button type="submit" className=" btn btn-warning ">
                    <a className="AllCourseApply"href='/Login'>Apply</a>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AllCoursesComp;
