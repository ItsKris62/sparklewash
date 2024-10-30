// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../ui/Toast';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Use useAuth for adminLogin function

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const { adminLogin } = useAuth(); // Destructure adminLogin from useAuth
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminLogin(email, password); // Use adminLogin for admin authentication
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/admin-dashboard'); // Redirect to Admin Dashboard
            }, 2000);
        } catch (error) {
            setError(error?.message || 'Invalid email or password');
            setShowToast(true);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
        setError('');
    };

    const handleBack = () => navigate(-1);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-200">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button onClick={handleBack} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none">
                    <FaArrowLeft size={20} />
                </button>

                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
                {showToast && <Toast message={error || "Login successful!"} onClose={handleCloseToast} />}
            </div>
        </div>
    );
};

export default AdminLogin;
