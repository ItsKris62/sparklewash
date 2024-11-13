import React, { useState } from 'react';
import aboutVideo from '../assets/videos/dry_cleaning.mp4';
import ContactUs from './ContactUs';

const AboutUsSection = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleContactClick = () => {
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  };
  
  return (
    <section className="relative py-16 bg-gradient-to-b from-blue-100 to-gray-100">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        
        {/* Image Section */}
        <div className="flex-1 md:order-3 flex justify-center mb-8 md:mb-0">
        <video 
            src={aboutVideo} 
            alt="About Us" 
            className="w-full max-w-2xl rounded-lg shadow-2xl" 
            autoPlay 
            loop 
            muted 
          />
          </div>
        
        {/* Text Section */}
        <div className="flex-1 md:order-1 text-center md:text-left space-y-6">
          <h2 className="text-4xl font-bold text-blue-900">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            At Clean Slate, we believe in providing not only top-quality laundry and cleaning services but also an
            experience that ensures customer satisfaction. We specialize in handling all fabric types with
            precision, returning your garments in impeccable condition.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With over a decade in the industry, our mission is to make your life easier and more comfortable.
            Your trust and satisfaction drive our commitment to excellence.
          </p>

          {/* Key Values Section */}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start space-x-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <h4 className="text-xl font-semibold text-blue-700">5+ Years</h4>
              <p className="text-sm text-gray-600">Industry Experience</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <h4 className="text-xl font-semibold text-blue-700">500+ Clients</h4>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <h4 className="text-xl font-semibold text-blue-700">Eco-Friendly</h4>
              <p className="text-sm text-gray-600">Cleaning Processes</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-8 space-x-4">
            <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={() => window.location.href='/learnmore'}>
              Learn More
            </button>
            <button className="bg-transparent text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            onClick={handleContactClick}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
      {/* Contact Form Overlay */}
      <ContactUs isOpen={isOverlayOpen} onClose={handleOverlayClose} />
    </section>
  );
};

export default AboutUsSection;
