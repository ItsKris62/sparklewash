import React from 'react';
import serviceImage1 from '../assets/images/professional-ironing-service.jpg'; // Ironing Service
import serviceImage2 from '../assets/images/dry-cleaning.jpg'; // Dry Cleaning Service
import serviceImage3 from '../assets/images/carpet-cleaning.jpg'; // Carpet Cleaning Service
import serviceImage4 from '../assets/images/house-cleaning.jpg'; // Airbnb Cleaning Service
import serviceImage5 from '../assets/images/meal-prep.jpg'; // Meal Prep Service
import serviceImage6 from '../assets/images/lawn_mawing.jpg'; // Landscaping Service

const Services = () => {
  const services = [
    {
      image: serviceImage1,
      title: 'Ironing Services',
      description: 'Fast, affordable, and efficient laundry services for your everyday needs.',
    },
    {
      image: serviceImage2,
      title: 'Dry Cleaning Services',
      description: 'Professional dry cleaning for delicate fabrics and specialty garments.',
    },
    {
      image: serviceImage3,
      title: 'Carpet Cleaning Services',
      description: 'Deep cleaning for carpets, removing dirt, stains, and allergens.',
    },
    {
      image: serviceImage4,
      title: 'Airbnb Cleaning Services',
      description: 'Reliable and thorough cleaning services for Airbnb properties.',
    },
    {
      image: serviceImage5,
      title: 'Meal Prep Services',
      description: 'Healthy and delicious meal prep services tailored to your dietary needs.',
    },
    {
      image: serviceImage6,
      title: 'Landscaping Services',
      description: 'Expert landscaping to enhance the beauty of your outdoor space.',
    },
  ];

  return (
    <div className="bg-[#F5F5DC] py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="p-6 absolute bottom-0 left-0 right-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
