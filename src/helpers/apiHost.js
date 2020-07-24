// http-common.js
import axios from 'axios';


export const HTTP = axios.create({
  baseURL: `http://18.231.186.105/api`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem('token'),
  }
})
