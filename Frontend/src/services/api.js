import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-spotify-h32z.onrender.com',
    headers: {
        'Accept': 'application/json',
    }
})

export default instance
 