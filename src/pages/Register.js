import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration process (validate and submit)
        alert("Registration successful!");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#004080] to-[#005f8e]">
            <h1 className="text-4xl font-bold text-white mb-5">Sign Up</h1>
            <form 
                onSubmit={handleSubmit} 
                className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-8 mb-4 w-full max-w-md mt-8"> {/* Added mt-8 class for top margin */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        name="name" 
                        type="text" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Your Name" 
                        required 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Email Address or Contact
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="contact" 
                        name="contact" 
                        type="text" 
                        value={formData.contact} 
                        onChange={handleChange} 
                        placeholder="Email or Contact Number" 
                        required 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Your Email" 
                        required 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        required 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        placeholder="Confirm Password" 
                        required 
                    />
                </div>
                <button 
                    className="bg-[#004080] hover:bg-[#005f8e] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300" 
                    type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;