import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import { useContext } from 'react';
import './App.css'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <div>Loading...</div>;
    }
    return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default App;
