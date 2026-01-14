import axios from 'axios';

const API = axios.create({
    baseURL: 'https://appsavemuniguate.com/apis/sirenas_municipales/public/api/',
    headers: {
        "Content-Type": "application/json"
    }
});

export { API };
