import React from 'react';
import Hero from '../components/Hero';
import serviceImage1 from '../assets/images/ironbox.jpg';
import serviceImage2 from '../assets/images/stack-t-shirt-polo.jpg';
import serviceImage3 from '../assets/images/still-life-cleaning-tools (1).jpg';
import serviceImage4 from '../assets/images/cleaning.jpg';
import FAQSection from '../components/FAQSection'; // Import FAQ Section

const Home = () => {
  return (
    <div className="bg-[#F5F5DC] smooth-scroll">
      <Hero />
      <section id="services" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src={serviceImage1} alt="Laundry Service" className="w-full h-40 object-cover rounded-t-lg"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Laundry Service</h3>
                <p className="text-gray-600 mb-4">Fast and reliable laundry service for all your needs.</p>
                <a href="/services/laundry" className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast">
                  Learn More
                </a>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src={serviceImage2} alt="Dry Cleaning" className="w-full h-40 object-cover rounded-t-lg"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dry Cleaning</h3>
                <p className="text-gray-600 mb-4">Professional dry cleaning for delicate garments.</p>
                <a href="/services/dry-cleaning" className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast">
                  Learn More
                </a>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src={serviceImage3} alt="House Cleaning" className="w-full h-40 object-cover rounded-t-lg"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">House Cleaning</h3>
                <p className="text-gray-600 mb-4">We offer thorough house cleaning services.</p>
                <a href="/services/cleaning-products" className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast">
                  Learn More
                </a>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src={serviceImage4} alt="AirBnb Cleaning Services" className="w-full h-40 object-cover rounded-t-lg"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">AirBnb Cleaning Services</h3>
                <p className="text-gray-600 mb-4">Expert AirBnb cleaning services to ensure that shine.</p>
                <a href="/services/airbnb-cleaning" className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add FAQ Section here */}
      <FAQSection />
    </div>
  );
};

export default Home;
