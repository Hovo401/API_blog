import axios from 'axios';



const axiosReq = axios.create({
    baseURL: 'http://localhost:3001/',
    credentials: true
});
const baseURL =  'http://localhost:3001/';




// console.log(localStorage.getItem('Authorization') )
export { axiosReq, baseURL }