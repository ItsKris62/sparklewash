import React from 'react';
import Hero from '../components/Hero';
import Team from '../components/Team';
import FAQSection from '../components/FAQSection'; // Import FAQ Section
import FeaturedServices from '../components/FeaturedServices'; // Import Featured Services
import AboutUsSection from '../components/AboutUsSection'; // Import About Us Section

const Home = () => {
  return (
    <div className="bg-[#F5F5DC] smooth-scroll">
      <Hero />
      <AboutUsSection />  {/* Include the About Us Section */}
      <FeaturedServices />  {/* Include the Featured Services component */}
      <FAQSection />
      <section id="team" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <Team />
        </div>
      </section>
    </div>
  );
};

export default Home;