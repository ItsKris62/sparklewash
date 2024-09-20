// src/components/LoginForm.js
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

function LoginForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { phone, password });
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-md">
      <PhoneInput
        country={'ke'}
        value={phone}
        onChange={setPhone}
        onlyCountries={countryCodes.map(country => country.code.toLowerCase())}
        inputClass="w-full p-2 border rounded"
        buttonClass="bg-white"
        dropdownClass="bg-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-navyBlue text-white rounded hover:bg-brightYellow">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
