import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="bg-softBlue min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-montserrat text-navyBlue">Welcome to Cleanslate</h1>
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
        <div className="w-full max-w-md">
          <RegistrationForm />
        </div>
        <div className="w-full max-w-md">
          <UserProfile />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
