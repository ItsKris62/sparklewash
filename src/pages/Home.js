import React from 'react';
import { Link, Element } from 'react-scroll';
import Header from '../layouts/Header';
import Hero from '../components/Hero';
import Team from '../components/Team';
import FAQSection from '../components/FAQSection';
import FeaturedServices from '../components/FeaturedServices';
import AboutUsSection from '../components/AboutUsSection';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200">
      <Header />

      <nav className="fixed top-0 right-0 p-4 bg-white shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="hero" smooth={true} duration={500}>Home</Link></li>
          <li><Link to="about" smooth={true} duration={500}>About Us</Link></li>
          <li><Link to="services" smooth={true} duration={500}>Services</Link></li>
          <li><Link to="faq" smooth={true} duration={500}>FAQ</Link></li>
          <li><Link to="team" smooth={true} duration={500}>Team</Link></li>
        </ul>
      </nav>

      <Element name="hero">
        <Hero />
      </Element>
      <Element name="about">
        <AboutUsSection />
      </Element>
      <Element name="services">
        <FeaturedServices />
      </Element>
      <Element name="faq">
        <FAQSection />
      </Element>
      <Element name="team">
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
