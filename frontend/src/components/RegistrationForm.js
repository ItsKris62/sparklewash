// src/components/RegistrationForm.js
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'flag-icon-css/css/flag-icons.min.css'; // Corrected path
import axios from 'axios';

const countryCodes = [
  { name: 'Kenya', code: 'KE' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Tanzania', code: 'TZ' },
  { name: 'Rwanda', code: 'RW' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Somalia', code: 'SO' },
];

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    location: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-md">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Surname"
        required
        className="p-2 border rounded"
      />
      <PhoneInput
        country={'ke'}
        value={formData.phone}
        onChange={handlePhoneChange}
        onlyCountries={countryCodes.map(country => country.code.toLowerCase())}
        inputClass="w-full p-2 border rounded"
        buttonClass="bg-white"
        dropdownClass="bg-white"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-navyBlue text-white rounded hover:bg-brightYellow">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
