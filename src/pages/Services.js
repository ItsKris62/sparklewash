import React, { useState } from 'react';
import Header from '../layouts/Header'; 
import serviceImage1 from '../assets/images/ironing_shirts.jpg';
import serviceImage2 from '../assets/images/dry-cleaning.jpg';
import serviceImage3 from '../assets/images/carpet-cleaning.jpg';
import serviceImage4 from '../assets/images/house-cleaning.jpg';
import serviceImage5 from '../assets/images/meal-prep.jpg';
import serviceImage6 from '../assets/images/lawn_mawing.jpg';
import RegisterOverlay from '../components/RegisterOverlay'; // Import RegisterOverlay component

const Services = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleRegisterOpen = () => setIsRegisterOpen(true);
  const handleRegisterClose = () => setIsRegisterOpen(false);

  const services = [
    {
      image: serviceImage1,
      title: 'Ironing Services',
      description: 'Fast, affordable, and efficient laundry services for your everyday needs.',
      extras: ['Same-day delivery', 'Eco-friendly detergents', 'Premium care'],
    },
    {
      image: serviceImage2,
      title: 'Dry Cleaning Services',
      description: 'Professional dry cleaning for delicate fabrics and specialty garments.',
      extras: ['Fabric protection', 'Odor removal', 'Specialized cleaning'],
    },
    {
      image: serviceImage3,
      title: 'Carpet Cleaning Services',
      description: 'Deep cleaning for carpets, removing dirt, stains, and allergens.',
      extras: ['Steam cleaning', 'Stain protection', 'Allergen removal'],
    },
    {
      image: serviceImage4,
      title: 'Airbnb Cleaning Services',
      description: 'Reliable and thorough cleaning services for Airbnb properties.',
      extras: ['Turnover cleaning', 'Laundry services', 'Guest readiness'],
    },
    {
      image: serviceImage5,
      title: 'Meal Prep Services',
      description: 'Healthy and delicious meal prep services tailored to your dietary needs.',
      extras: ['Custom meal plans', 'Organic ingredients', 'Weekly deliveries'],
    },
    {
      image: serviceImage6,
      title: 'Landscaping Services',
      description: 'Expert landscaping to enhance the beauty of your outdoor space.',
      extras: ['Lawn care', 'Garden design', 'Seasonal maintenance'],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-500 to-gray-300 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Explore Our Services</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Discover our range of quality services designed to meet your needs and exceed expectations.
        </p>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-6 py-16">
        {/*<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group bg-white"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-6 absolute bottom-0 text-white">
                  <h4 className="text-lg font-semibold">Includes:</h4>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
                    {service.extras.map((extra, idx) => (
                      <li key={idx}>{extra}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-b from-gray-200 to-gray-500 py-12 text-navy text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">Join us today and experience the best in service and convenience.</p>
        <button
          onClick={handleRegisterOpen}
          className="bg-white text-navy px-8 py-4 rounded-lg font-semibold hover:bg-navy hover:text-white transition-colors"
        >
          Sign Up Now
        </button>
      </div>

      {/* Register Overlay */}
      {isRegisterOpen && <RegisterOverlay isOpen={isRegisterOpen} onClose={handleRegisterClose} />}
    </div>
  );
};

export default Services;
