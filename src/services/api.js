import axios from 'axios';

const api = axios.create({
    baseURL: 'http://my-json-server.typicode.com/codificar/oficina/proposals'
});

export default api;