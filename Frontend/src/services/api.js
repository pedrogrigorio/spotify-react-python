import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-python-s1qy.onrender.com',
    headers: {
        'Accept': 'application/json',
    }
})

export default instance
