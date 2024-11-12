import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceImage1 from '../assets/images/ironing_shirts.jpg';
import serviceImage2 from '../assets/images/Laundry-machines.jpg';
import serviceImage3 from '../assets/images/house_cleaning.jpg';
import serviceImage4 from '../assets/images/disinfecting-home.jpg';

const servicesData = [
    {
        id: 1,
        title: "Laundry & Ironing",
        description: "Fast and reliable laundry service for all your needs. Our laundry service offers wash, dry, and fold options to suit your schedule and preferences.",
        image: serviceImage1,
        extraServices: ["Wash & Fold", "Ironing", "Stain Removal"],
    },
    {
        id: 2,
        title: "Dry Cleaning",
        description: "Professional dry cleaning for delicate garments. We ensure that your clothes receive the best care with our eco-friendly cleaning processes.",
        image: serviceImage2,
        extraServices: ["Shirt Laundry", "Alterations", "Stain Removal"],
    },
    {
        id: 3,
        title: "House Cleaning",
        description: "We offer thorough house cleaning services. Our trained staff will make your home shine with customized cleaning plans.",
        image: serviceImage3,
        extraServices: ["Deep Cleaning", "Carpet Cleaning", "Window Cleaning"],
    },
    {
        id: 4,
        title: "AirBnb Cleaning",
        description: "Expert AirBnb cleaning services to ensure that shine. We handle everything from laundry to inspection to keep your guests happy.",
        image: serviceImage4,
        extraServices: ["Restocking Supplies", "Laundry", "Inspection"],
    },
];

const FeaturedServices = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const navigate = useNavigate();

    const handleLogin = () => {
        closeOverlay();
        navigate('/login');
      };
      
      const handleSignUp = () => {
        closeOverlay();
        navigate('/register');
      };

    const handleLearnMore = (service) => {
        setSelectedService(service);
        setOverlayVisible(true);
    };

    const closeOverlay = () => {
        setOverlayVisible(false);
        setSelectedService(null);
    };


    return (
        <section id="services" className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-8 text-navy md:text-left">Our Featured Services</h2>
                <p className="text-blue-900 mb-12 text-lg md:text-left">Discover our top services designed to cater to your needs. Join us to enjoy personalized, quality service.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map((service) => (
                        <div
                            key={service.id}
                            className="relative bg-white rounded-lg shadow-lg overflow-hidden group transform transition duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                <button
                                    onClick={() => handleLearnMore(service)}
                                    className="text-white font-semibold bg-blue-500 px-6 py-2 rounded-full hover:bg-blue-600 transition"
                                >
                                    Learn More
                                </button>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
                                <p className="text-gray-600 mt-2 mb-4">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isOverlayVisible && selectedService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 max-w-lg mx-4 text-center relative shadow-xl transform transition-all duration-500">
                        <button onClick={closeOverlay} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl">
                            &times;
                        </button>
                        <h3 className="text-3xl font-semibold mb-4">{selectedService.title}</h3>
                        <p className="mb-4 text-gray-700">{selectedService.description}</p>
                        
                        <div className="text-left mb-6">
                            <h4 className="font-semibold mb-2 text-xl">Additional Services:</h4>
                            <ul className="list-disc list-inside text-gray-600">
                                {selectedService.extraServices.map((extraService, index) => (
                                    <li key={index}>{extraService}</li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-gray-500 mb-6">Sign in or sign up to request this service or place an order.</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleLogin} className="bg-navy text-white py-2 px-6 rounded-full hover:bg-blue-600 transition">
                                Sign In
                            </button>
                            <button onClick={handleSignUp} className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FeaturedServices;
