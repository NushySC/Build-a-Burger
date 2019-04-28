import axios from 'axios'

const instance = axios.create ({
    baseURL: 'https://build-a-burger-bfb2e.firebaseio.com/'
});

export default instance