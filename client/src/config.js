
import axios from 'axios';
// http://localhost:8800   https://moviestreaingapp.herokuapp.com/api/
export const axiosInstance =axios.create({
    baseUrl : "http://localhost:8800/api",
})