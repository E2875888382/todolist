import axios from 'axios';

const instance = axios.create({
    baseURL: API_CONFIG,
    timeout: 4000
});

instance.interceptors.request.use(config=> {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.common['token'] = token;
    }
    return config;
}, error=> Promise.reject(error));

export default instance;