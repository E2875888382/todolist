import axios from 'axios';

const instance = axios.create({
    baseURL: API_CONFIG,
    timeout: 4000
});

instance.interceptors.request.use(config=> {
    config.headers.common['token'] = 'userToken';
    return config;
}, error=> Promise.reject(error));

export default instance;