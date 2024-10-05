import React, { useState } from 'react';

const Login = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [email, setEmail] = useState('');

    const handleSSO = () => {
        // Handle single sign-on process
        console.log("Single Sign-On initiated with email:", email);
        setShowOverlay(false);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-softBlue">
            <h1 className="text-4xl font-bold text-navyBlue mb-5">Login</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-navyBlue text-sm font-bold mb-2" htmlFor="contact">
                        Contact
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-navyBlue leading-tight focus:outline-none focus:shadow-outline" id="contact" type="text" placeholder="Contact" />
                </div>
                <div className="mb-6">
                    <label className="block text-navyBlue text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-navyBlue leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                </div>
                <button className="bg-navyBlue hover:bg-skyBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button" onClick={() => alert('Logging in...')}>
                    Login
                </button>
                <div className="mt-4 text-center">
                    <button className="text-navyBlue hover:text-skyBlue" type="button" onClick={() => setShowOverlay(true)}>
                        Use Single Sign-On
                    </button>
                </div>
            </form>

            {showOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-lg font-bold">Enter your Email for SSO</h2>
                        <input 
                            className="shadow border rounded w-full py-2 px-3 text-navyBlue leading-tight focus:outline-none focus:shadow-outline mb-4" 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="bg-navyBlue hover:bg-skyBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSSO}>
                            Submit
                        </button>
                        <button className="text-red-500 mt-4" onClick={() => setShowOverlay(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;