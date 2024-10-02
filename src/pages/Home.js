import React from 'react';
import Hero from '../components/Hero';
import serviceImage1 from '../assets/images/ironbox.jpg'; // Import your service images
import serviceImage2 from '../assets/images/stack-t-shirt-polo.jpg';
import serviceImage3 from '../assets/images/still-life-cleaning-tools (1).jpg';
import serviceImage4 from '../assets/images/cleaning.jpg';

const Home = () => {
  return (
    <div className="bg-[#F5F5DC] smooth-scroll" >
      <Hero />
      <section id="services" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> {/* Change to 4 columns for larger screens */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={serviceImage1} alt="Service 1" className="w-full h-36 object-cover" /> {/* Reduced height */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">Laundry Service</h3>
                <p className="text-gray-600">Fast and reliable laundry service for all your needs.</p>
                <a
                  href="/services/laundry"
                  className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={serviceImage2} alt="Service 2" className="w-full h-36 object-cover" /> {/* Reduced height */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">Dry Cleaning</h3>
                <p className="text-gray-600">Professional dry cleaning for delicate garments.</p>
                <a
                  href="/services/dry-cleaning"
                  className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={serviceImage3} alt="Service 3" className="w-full h-36 object-cover" /> {/* Reduced height */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">House Cleaning</h3> {/* Changed title for clarity */}
                <p className="text-gray-600">we offer thorough House cleaning services</p>
                <a
                  href="/services/cleaning-products"
                  className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={serviceImage4} alt="Service 4" className="w-full h-36 object-cover" /> {/* Reduced height */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">AirBnb Cleaning Services</h3>
                <p className="text-gray-600">Expert AirBnb Cleaning Services to ensure that shine.</p>
                <a
                  href="/services/airbnb-cleaning"
                  className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
