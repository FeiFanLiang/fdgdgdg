import axios from 'axios';
import path from './api';
let base = '';
export default {
  postError(params) {
    return axios.get(`${base}/error`, { params: params });
  },
  requestLogin(params) {
    return axios.post(`${base}/login`, params).then(res => res.data);
  },
  requestRegister(params) {
    return axios.post(`${base}/register`, params).then(res => res.data);
  }
};
