// src/pages/LearnMore.js
import React from 'react';
import '../styles/LearnMore.css';
import Header from '../layouts/Header';


// Importing the images
import image2 from '../assets/images/vacuum-cleaner.jpg';
import image1 from '../assets/images/cleaning-product.jpg';
import image3 from '../assets/images/meal-prep1.jpg';
import image4 from '../assets/images/carpet-cleaning.jpg';
import image5 from '../assets/images/house_cleaning.jpg';

const LearnMore = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="learn-more-page bg-blue-50 text-gray-800 min-h-screen p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-900 mb-4 leading-tight">Discover Clean Slate</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            At Clean Slate, we provide top-notch laundry and cleaning services tailored to your needs. From delicate fabrics to large home essentials, we handle it all with precision and care.
          </p>
        </header>

        {/* Bento Grid Section */}
        <div className="bento-grid grid gap-4 mb-16">
          <div
            className="bento-item h-80 md:h-full col-span-2 row-span-2 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${image1})` }}
          >
            <div className="overlay">
              <h3 className="text-2xl font-bold text-white">Professional Laundry</h3>
              <p className="text-white">Efficient washing for all types of fabrics.</p>
            </div>
          </div>
          <div
            className="bento-item h-80 md:h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${image2})` }}
          >
            <div className="overlay">
              <h3 className="text-xl font-semibold text-white">Dry Cleaning</h3>
            </div>
          </div>
          <div
            className="bento-item h-80 md:h-full col-span-2 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${image3})` }}
          >
            <div className="overlay">
              <h3 className="text-2xl font-bold text-white">Eco-Friendly Solutions</h3>
              <p className="text-white">Sustainable cleaning to reduce our carbon footprint.</p>
            </div>
          </div>
          <div
            className="bento-item h-80 md:h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${image4})` }}
          >
            <div className="overlay">
              <h3 className="text-xl font-semibold text-white">Carpet Cleaning</h3>
            </div>
          </div>
          <div
            className="bento-item h-80 md:h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${image5})` }}
          >
            <div className="overlay">
              <h3 className="text-xl font-semibold text-white">House Cleaning</h3>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-us-section text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Clean Slate?</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Clean Slate is more than just laundry. We’re dedicated to bringing comfort and convenience to your daily life, treating every item with the utmost care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard title="Eco-Friendly" description="Sustainable cleaning methods to reduce our carbon footprint." />
            <FeatureCard title="Reliable Service" description="Your satisfaction is guaranteed with every service." />
            <FeatureCard title="Experienced Staff" description="Our team is trained to handle delicate fabrics and high-end items." />
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section text-center mt-12">
          <button className="cta-button bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-lg font-semibold">
            Schedule Your First Clean Slate Experience
          </button>
        </div>
      </main>
    </div>
  );
};

// Simple reusable card components for feature sections
const FeatureCard = ({ title, description }) => (
  <div className="feature-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
    <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LearnMore;
