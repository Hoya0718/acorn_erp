import axios from 'axios';


const instance = axios.create({
    baseURL : 'http://localhost:9099/api',
    withCredentials: true, // 세션 쿠키를 포함
    headers : {
        'Content-Type' : 'application/json'
    }
});

export default instance; 