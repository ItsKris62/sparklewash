import React from 'react';
import { Link, Element } from 'react-scroll'; // Import Link and Element from react-scroll
import Header from '../layouts/Header'; // Import the Header component
import Hero from '../components/Hero';
import Team from '../components/Team';
import FAQSection from '../components/FAQSection';
import FeaturedServices from '../components/FeaturedServices';
import AboutUsSection from '../components/AboutUsSection';

const Home = () => {
  return (
    <div className="bg-[#F5F5DC]">
      <Header /> {/* Add the Header component here */}

      {/* Navigation Links */}
      <nav className="fixed top-0 right-0 p-4 bg-white shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="hero" smooth={true} duration={500}>Home</Link></li>
          <li><Link to="about" smooth={true} duration={500}>About Us</Link></li>
          <li><Link to="services" smooth={true} duration={500}>Services</Link></li>
          <li><Link to="faq" smooth={true} duration={500}>FAQ</Link></li>
          <li><Link to="team" smooth={true} duration={500}>Team</Link></li>
        </ul>
      </nav>

      {/* Sections with Element for smooth scrolling */}
      <Element name="hero" className="element">
        <Hero />
      </Element>
      <Element name="about" className="element">
        <AboutUsSection />
      </Element>
      <Element name="services" className="element">
        <FeaturedServices />
      </Element>
      <Element name="faq" className="element">
        <FAQSection />
      </Element>
      <Element name="team" className="element">
        <div className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <Team />
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Home;