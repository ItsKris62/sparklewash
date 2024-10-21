import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    age: '',
  });

  const navigate = useNavigate(); // Hook to change routes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // You can add registration logic here
    alert("Registration successful!");
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleResetCredentials = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      age: '',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#004080] to-[#005f8e]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input 
            placeholder="First Name" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange}
            required
          />
          <input 
            placeholder="Last Name" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange}
            required
          />
          <input 
            placeholder="Email" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            required
          />
          <input 
            placeholder="Confirm Email" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="email" 
            name="confirmEmail" 
            value={formData.confirmEmail} 
            onChange={handleChange}
            required
          />
          <input 
            placeholder="Password" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            required
          />
          <input 
            placeholder="Confirm Password" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange}
            required
          />
          
          <label className="text-sm mb-2 text-gray-900 cursor-pointer" htmlFor="gender">
            Gender
          </label>
          <select 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            id="gender" 
            name="gender" 
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="text-sm mb-2 text-gray-900 cursor-pointer" htmlFor="age">
            Age
          </label>
          <input 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            id="age" 
            type="date" 
            name="age" 
            value={formData.age}
            onChange={handleChange}
          />
          <p className="text-gray-900 mt-4">
            Already have an account? 
            <button 
              className="text-sm text-blue-500 hover:underline mt-4 cursor-pointer" 
              onClick={handleLoginClick}
            >
              Login
            </button>
          </p>
          <button 
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" 
            type="submit"
          >
            Sign Up
          </button>
          <button 
            type="button" 
            onClick={handleResetCredentials} 
            className="mt-4 text-gray-600 hover:underline"
          >
            Reset Credentials
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;