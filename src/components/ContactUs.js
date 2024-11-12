import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Toast from '../components/ui/Toast';
import { FaTimes } from 'react-icons/fa';

const ContactUs = ({ isOpen, onClose }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    emailjs
      .send(
        'service_vrpbtcn',  // Replace with your EmailJS Service ID
        'template_3emfnhb',  // Replace with your EmailJS Template ID
        formData,
        'i3WTKRgvw0q0J5v3m'       // Replace with your EmailJS User ID
      )
      .then(
        () => {
          setToastMessage('Message sent successfully!');
          setToastVisible(true);
          onClose();

          setTimeout(() => setToastVisible(false), 3000);
        },
        (error) => {
          console.error('Failed to send message:', error);
          setToastMessage('Failed to send message, please try again.');
          setToastVisible(true);
        }
      );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow-lg transform scale-100 transition-transform duration-300 ease-in-out relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Contact Us</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <input
              name="subject"
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Subject"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              rows="4"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {toastVisible && <Toast message={toastMessage} onClose={() => setToastVisible(false)} />}
    </div>
  );
};

export default ContactUs;
