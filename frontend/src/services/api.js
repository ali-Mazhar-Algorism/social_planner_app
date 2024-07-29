import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/auth/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    req.headers['Content-Type'] = 'application/json';
    return req;
});

export const register = (formData) => API.post('register/', formData);
export const login = (formData) => API.post('login/', formData);
export const refreshToken = (formData) => API.post('token/refresh/', formData);
export const logout = (formData) => API.post('logout/', formData);

export default API;
