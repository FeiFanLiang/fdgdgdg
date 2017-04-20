import axios from 'axios';
import path from './api';
let base = '';
export default {
  login(params) {
    return axios.post(`/login`, {params: params}).then(res => res.data);
  },
  register(params) {
    return axios.post(`/register`, {params: params}).then(res => res.data);;
  }
};
