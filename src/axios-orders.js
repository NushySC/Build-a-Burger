import axios from 'axios'

const instance = axios.create ({
    baseURL: 'https://build-a-burger-nsh.firebaseio.com/'
});

export default instance