import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Carousel1  from '../assets/Carousel/Carousel1.jpg';
import Carousel2  from '../assets/Carousel/Carousel2.webp';
import Carousel3  from '../assets/Carousel/Carousel3.jpg';
import { useNavigate } from 'react-router-dom';

// import ContactPageIcon from '@mui/icons-material/ContactPage';
import './Style.css';

const stats = [
  { label: 'Students Enrolled', value: '5,000+' },
  { label: 'Placement Rate', value: '90%' },
  { label: 'Courses Offered', value: '10+' },
  { label: 'Expert Faculty', value: '20+' },
  { label: 'Industry Partnerships', value: '25+' },
  { label: 'Years of Excellence', value: '10+' }
];



const programs = [
  {
    title: 'FullStack with .Net',
    duration: '6 Months',
    highlights: 'Learn to build dynamic and scalable web applications using .NET technologies, C#, React and JavaScript frameworks.'
  },
  {
    title: 'Software Testing',
    duration: '3 Months',
    highlights: 'Master manual and automated testing techniques, tools like Selenium, and how to ensure quality in software products.'
  },
  {
    title: 'Cyber Security',
    duration: '6 Months',
    highlights: 'Gain expertise in ethical hacking, network security, penetration testing, and security protocols to protect digital assets.'
  },
  {
    title: 'Artificial Intelligence',
    duration: '6 Months',
    highlights: 'Explore machine learning, deep learning, and AI algorithms, with hands-on projects to build smart applications and systems.'
  }
];


const testimonials = [
  {
    quote: 'Mirai D. Scholars transformed my passion into a career!',
    name: 'Aditi Sharma',
    batch: 'Full Stack Development Program'
  },
  {
    quote: 'The faculty here is outstanding, always pushing us to excel.',
    name: 'Rohan Mehta',
    batch: 'Cyber Security Program'
  },
  {
    quote: 'The global exposure I gained from Mirai D. Scholars was life-changing.',
    name: 'Priya Singh',
    batch: 'Artificial Intelligence Program'
  }
];


const HomeComp = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.location.href="contactus";
    // navigate('/contactus');
  };
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} className='HomePageComp'>

 {/* Key Highlights Section */}
 <section style={{ textAlign: 'center', marginBottom: '40px' }} className='KeyHighlightsSection'>
        <h2  className="carousel-heading">Key Highlights</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                padding: '15px',
                background: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '10px',
                minWidth: '150px',
                opacity: 0,
                animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`
              }}
            >
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#007bff' }}>{stat.value}</h3>
              <p style={{ color: '#555' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Divider or Spacer */}
<div style={{ margin: '40px 0', borderBottom: '2px solid rgb(252, 222, 198)', width: '60%', marginLeft: 'auto', marginRight: 'auto' }} />



<div className='carousel-container'>
  <h2 className="carousel-heading">Step Into Innovation and Growth</h2>

<Carousel >
      <Carousel.Item interval={1000} >
        <img src={Carousel1} alt='1' className='carousel1'/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img src={Carousel2} alt='2' className='carousel1'/>
        <Carousel.Caption>
          {/* <h3>Second slide label</h3> */}
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img src={Carousel3} alt='3' className='carousel1'/>
        <Carousel.Caption>
          {/* <h3>Third slide label</h3> */}
          {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>

     {/* Divider or Spacer */}
     <div style={{ margin: '40px 0', borderBottom: '2px solid rgb(252, 222, 198)', width: '60%', marginLeft: 'auto', marginRight: 'auto' }} />

     

      {/* Featured Programs Section */}
      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="carousel-heading">Featured Courses</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {programs.map((program, index) => (
            <div
              key={index}
              style={{
                borderTop: '5px solid #FF8E35',
                borderLeft : '5px solid #FF8E35',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                width: '250px',
                transition: 'box-shadow 0.3s',
                cursor: 'pointer',
                background:"rgb(250, 229, 214)"
              }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }} className='FeatTitle'>{program.title}</h3>
              <p style={{ color: '#666' }} className='FeatDuration'>{program.duration}</p>
              <p style={{ color: '#333', marginBottom: '15px' , textAlign: "center" , width:"215px" }} className='FeatHigh'>{program.highlights}</p>
              <button style={{ padding: '10px 20px', background: 'rgb(243, 179, 74)', color: 'rgb(55, 55, 55)', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>Learn More</button>
            </div>
          ))}
        </div>
      </section>

           {/* Divider or Spacer */}
     <div style={{ margin: '40px 0', borderBottom: '2px solid rgb(252, 222, 198)', width: '60%', marginLeft: 'auto', marginRight: 'auto' }} />

      {/* Testimonials Section */}
      <section style={{ textAlign: 'center' }}>
        <h2 style={{  fontWeight: 'bold', marginBottom: '20px' }} className="carousel-heading">Testimonials</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                background: '#eef6ff',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '250px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                opacity: 0,
                animation: `fadeInUp 0.5s ease ${index * 0.2}s forwards`
              }}
            >
              <p style={{ fontStyle: 'italic', color: '#444', marginBottom: '10px' }}>"{testimonial.quote}"</p>
              <h4 style={{ fontWeight: '600', color: '#007bff' }}>{testimonial.name}</h4>
              <p style={{ fontSize: '14px', color: '#777' }}>{testimonial.batch}</p>
            </div>
          ))}
        </div>
      </section>


      <div style={{ margin: '40px 0', borderBottom: '2px solid rgb(252, 222, 198)', width: '60%', marginLeft: 'auto', marginRight: 'auto' }} />


      <section style={{ textAlign: 'center' , justifyContent : 'center' , display: 'flex' }}>
      <div className="KnowSection">
            <h2 className="know-heading">To Know More</h2>
            <button className='HomeContactUs'onClick={handleClick} >Contact Us</button>
              {/* <ContactPageIcon/> */}
          </div>
      </section>



    </div>
  );
};

export default HomeComp;
