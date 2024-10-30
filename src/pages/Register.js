// src/pages/Register.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../components/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        countryCode: '+254',
        contact: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { register } = useAuth(); // Destructure register from useAuth
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await register(formData); // Use register function from context
            toast.success("Registration successful! Redirecting...");
            setTimeout(() => navigate('/user-dashboard'), 2000);
        } catch (error) {
            const errorMsg = error.message || 'Registration failed. Please try again.';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#004080] to-[#005f8e]">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            
            {/* Back Arrow Icon at Top-Right */}
            <button onClick={() => navigate(-1)} className="absolute top-5 right-5 text-white hover:text-gray-300">
                <FaArrowLeft size={20} />
            </button>

            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Create an Account</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* First Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#005f8e]"
                        />
                    </div>

                    {/* Last Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#005f8e]"
                        />
                    </div>

                    {/* Country Code and Contact Number Fields */}
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 mb-1 mr-2" htmlFor="countryCodeContact">Contact</label>
                        <select
                            name="countryCode"
                            id="countryCodeContact"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="border rounded-l-md bg-gray-100 py-2 px-4 focus:outline-none"
                        >
                            <option value="+254">+254 (KE)</option>
                            <option value="+255">+255 (TZ)</option>
                            <option value="+256">+256 (UG)</option>
                        </select>
                        <input
                            type="text"
                            name="contact"
                            placeholder="123456789" // Placeholder for 9 digits
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded-r-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#005f8e]"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#005f8e]"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#005f8e]"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#005f8e]"
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 rounded-md hover:from-blue-600 hover:to-indigo-600 transition ease-in-out duration-200"
                    >
                        Sign Up
                    </button>

                    {/* Link to Login Page */}
                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
