import React from 'react';
import './Style.css';

const AboutUsComp = () => {
  return (
    <div className="about-container">
      {/* About Us Header */}
      <header className="about-header">
        <h1>About Us</h1>
        <p className="about-tagline">Empowering Futures, Inspiring Growth.</p>
      </header>

      {/* Mission Section */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to nurture a culture of learning and innovation. We aim to equip individuals with the knowledge, skills, and mindset required to thrive in a rapidly evolving world.
        </p>
      </section>

      {/* Vision Section */}
      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          To be a global leader in education and innovation, creating pathways for success by inspiring minds and transforming lives through quality learning experiences.
        </p>
      </section>

      {/* Core Values Section */}
      <section className="about-section">
        <h2>Our Core Values</h2>
        <ul className="core-values">
          <li><strong>Integrity:</strong> Upholding the highest ethical standards in all we do.</li>
          <li><strong>Innovation:</strong> Fostering creativity to solve real-world challenges.</li>
          <li><strong>Excellence:</strong> Striving for continuous improvement and outstanding results.</li>
          <li><strong>Collaboration:</strong> Working together to achieve common goals.</li>
        </ul>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          At Mirai D. Scholars, we offer more than just education. We provide an environment where knowledge meets opportunity. Our expert faculty, cutting-edge curriculum, and focus on real-world applications set us apart.
        </p>
      </section>

      {/* Team Section */}
      <section className="about-section">
        <h2>Our Team</h2>
        <p>
          Our team is a diverse group of dedicated professionals passionate about education, innovation, and growth. Together, we are committed to guiding students towards achieving their fullest potential.
        </p>
      </section>
    </div>
  );
};

export default AboutUsComp;
