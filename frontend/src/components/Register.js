import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from 'react-router-dom';

const Register = () => {
    const { user, register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', organizations: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        const errors = {};
        if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';
        }
        if (!/[A-Z]/.test(password)) {
            errors.password = 'Password must contain at least one uppercase letter.';
        }
        if (!/[a-z]/.test(password)) {
            errors.password = 'Password must contain at least one lowercase letter.';
        }
        if (!/\d/.test(password)) {
            errors.password = 'Password must contain at least one number.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.password = 'Password must contain at least one special character.';
        }
        return errors;
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.username) {
            errors.username = 'Full Name is required.';
        }
        if (!data.organizations) {
            errors.organizations = 'Organization Name is required.';
        }
        if (!data.email) {
            errors.email = 'Email Address is required.';
        }
        if (!data.password) {
            errors.password = 'Password is required.';
        } else {
            Object.assign(errors, validatePassword(data.password));
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return; // Stop form submission
        } else {
            setErrors({});
            register(formData);
        }
    };

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-2 text-center">Register as a new customer</h2>
                <p className="text-center mb-4 text-gray-600">Corem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="UserName"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="organizations"
                            placeholder="Organization Name"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.organizations && <p className="text-red-500 text-xs italic">{errors.organizations}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-gray-100 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Existing customer? Login to your account here
                        </Link>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        By submitting you agree to website’s <a href="#" className="text-blue-500">Terms & Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
                    </p>
                    <div className="mt-4 text-center text-gray-500">
                        <p><span role="img" aria-label="lock">🔒</span> Advanced encryption keeps your data safe and secure</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
