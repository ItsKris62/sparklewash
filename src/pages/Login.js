import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = () => {
        // Static credentials (replace with your preferred credentials)
        const staticCredentials = {
            contact: 'admin@example.com', // Example email
            password: 'password123', // Example password
        };

        // Check if the entered credentials match static credentials
        if (contact === staticCredentials.contact && password === staticCredentials.password) {
            // Redirect to the admin dashboard on successful login
            navigate('/admin-dashboard'); // Adjust the path to your actual admin dashboard route
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    const handleSSO = () => {
        console.log("Single Sign-On initiated with contact:", contact);
        setShowOverlay(false);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#004080] to-[#005f8e]">
            <h1 className="text-4xl font-bold text-white mb-5">Login</h1>
            <form className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-8 mb-4 w-full max-w-md">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Email Address or Contact
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="contact" 
                        type="text" 
                        placeholder="Email or Contact Number" 
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    className="bg-[#004080] hover:bg-[#005f8e] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300"
                    type="button" 
                    onClick={handleLogin}> {/* Call handleLogin on click */}
                    Login
                </button>
                <div className="mt-4 text-center">
                    <button 
                        className="text-[#005f8e] hover:text-[#0077a6] transition duration-300" 
                        type="button" 
                        onClick={() => setShowOverlay(true)}>
                        Use Single Sign-On
                    </button>
                </div>
            </form>

            {showOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Enter your Email for SSO</h2>
                        <input 
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" 
                            type="email" 
                            placeholder="Email" 
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <button 
                            className="bg-[#004080] hover:bg-[#005f8e] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300" 
                            onClick={handleSSO}>
                            Submit
                        </button>
                        <button 
                            className="text-red-500 mt-4 hover:text-red-700 transition duration-300" 
                            onClick={() => setShowOverlay(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;