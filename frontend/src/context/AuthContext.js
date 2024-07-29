import React, { createContext, useState, useEffect } from 'react';
import * as api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUser = async () => {
                try {
                    const { data } = await api.refreshToken({ refresh: localStorage.getItem('refresh') });
                    localStorage.setItem('token', data.access);
                    setUser(true);
                } catch {
                    setUser(false);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (formData) => {
        try {
            const { data } = await api.login(formData);
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            setUser(true);
        } catch (error) {
            console.error('Login Error:', error.response ? error.response.data : error.message);
        }
    };

    const register = async (formData) => {
        try {
            await api.register(formData);
            await login({ username: formData.username, password: formData.password });
        } catch (error) {
            console.error('Register Error:', error.response ? error.response.data : error.message);
        }
    };

    const logout = async () => {
        try {
            await api.logout({ refresh: localStorage.getItem('refresh') });
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            setUser(false);
        } catch (error) {
            console.error('Logout Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
