import React from 'react';
import aboutImage from '../assets/images/aboutus.png'; // Replace with your image path

const AboutUsSection = () => {
  return (
    <section className="flex flex-col md:flex-row py-16 bg-[#F5F5DC]">
      <div className="flex-1 flex items-center justify-center md:order-1">
        <img src={aboutImage} alt="About Us" className="max-w-xs rounded-lg shadow-lg" />
      </div>
      <div className="flex-1 flex items-center justify-center md:order-2 p-6">
        <div>
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            We are dedicated to providing top-quality laundry and cleaning services to our customers. Our team
            is trained to handle all types of fabrics and ensure that your garments are returned to you in
            pristine condition.
          </p>
          <p className="text-gray-700">
            With years of experience in the industry, we strive for excellence and customer satisfaction in
            every task we undertake. Your comfort and trust are our top priorities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;