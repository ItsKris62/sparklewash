// src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../components/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            toast.success("Login successful! Redirecting...");
            navigate('/user-dashboard');
        } catch (error) {
            const errorMsg = error.message || 'Invalid credentials. Please try again.';
            toast.error(errorMsg);
        }
    };

    const handleBack = () => navigate(-1);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#004080] to-[#005f8e]">
            <button className="absolute top-5 left-5 text-white hover:text-gray-300" onClick={handleBack}>
                <FaArrowLeft size={20} />
            </button>
            <h1 className="text-4xl font-bold text-white mb-5">Login</h1>
            <form className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-8 mb-4 w-full max-w-md" onSubmit={handleLogin}>
                <div className="relative mb-6">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400 transition-all duration-200" />
                    <input
                        className="peer shadow appearance-none border rounded w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#005f8e]"
                        type="text"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="relative mb-6">
                    <FaLock className="absolute left-3 top-3 text-gray-400 transition-all duration-200" />
                    <input
                        className="peer shadow appearance-none border rounded w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#005f8e]"
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="bg-[#004080] hover:bg-[#005f8e] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300"
                    type="submit"
                >
                    Login
                </button>
                
                {/* Link to Signup Page */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-gray-600 mt-2">
                        <Link to="/" className="text-blue-600 hover:underline">
                            Back to Home
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
