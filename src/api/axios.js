import axios from 'axios';


const instance = axios.create({
    baseURL : 'http://localhost:9099/api',
    withCredentials: true, // 세션 쿠키를 포함
    headers : {
        'Content-Type' : 'application/json'
    },
    withCredentials: true // 모든 요청에 쿠키를 포함시킵니다.
});

export default instance; 