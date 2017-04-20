import axios from 'axios';
import path from './api';
export default {
  login(params) {
    return axios.post(path.apiBaseUrl + 'Account/Login', { params: params });
  },
  register(params) {
    return axios.post(path.apiBaseUrl + 'Account/Register', { params: params });
  },
  logout(params) {
    return axios.post(path.apiBaseUrl + 'Account/Logout', { params: params });
  }
};
