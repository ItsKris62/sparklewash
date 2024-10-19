import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import serviceImage1 from '../assets/images/ironbox.jpg';
import serviceImage2 from '../assets/images/stack-t-shirt-polo.jpg';
import serviceImage3 from '../assets/images/still-life-cleaning-tools (1).jpg';
import serviceImage4 from '../assets/images/cleaning.jpg';

const servicesData = [
    {
        id: 1,
        title: "Laundry Service",
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
        title: "AirBnb Cleaning Services",
        description: "Expert AirBnb cleaning services to ensure that shine. We handle everything from laundry to inspection to keep your guests happy.",
        image: serviceImage4,
        extraServices: ["Restocking Supplies", "Laundry", "Inspection"],
    },
];

const FeaturedServices = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate(); // Use useNavigate

    const handleLearnMore = (service) => {
        setSelectedService(service);
        setOverlayVisible(true);
    };

    const closeOverlay = () => {
        setOverlayVisible(false);
        setSelectedService(null);
    };

    const handleLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    const handleSignUp = () => {
        navigate('/register'); // Navigate to the register page
    };

    return (
        <section id="services" className="py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Featured Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map(service => (
                        <div key={service.id} className="bg-white rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-t-lg" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <button
                                    onClick={() => handleLearnMore(service)}
                                    className="inline-block mt-4 bg-yellow-500 text-navy font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-contrast"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isOverlayVisible && selectedService && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
                        <h3 className="text-2xl font-semibold mb-4">{selectedService.title}</h3>
                        <p className="mb-4">{selectedService.description}</p>
                        <h4 className="font-semibold mb-2">Additional Services:</h4>
                        <ul className="list-disc list-inside mb-4">
                            {selectedService.extraServices.map((extraService, index) => (
                                <li key={index}>{extraService}</li>
                            ))}
                        </ul>
                        <p className="mb-4">To request this service or place an order, please sign in or sign up.</p>
                        <div className="flex justify-center space-x-2">
                            <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded-full transition duration-300 hover:bg-blue-400">
                                Sign In
                            </button>
                            <button onClick={handleSignUp} className="bg-green-500 text-white py-2 px-4 rounded-full transition duration-300 hover:bg-green-400">
                                Sign Up
                            </button>
                            <button onClick={closeOverlay} className="bg-red-500 text-white py-2 px-4 rounded-full transition duration-300 hover:bg-red-400">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FeaturedServices;