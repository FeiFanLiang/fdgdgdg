import axios from 'axios';
import path from './api';

export default {
  list(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/All`, params);
  },
  detail(id) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/${id}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + `Hotel/PayCompany`, params);
  },
  edit(params) {
    return axios.put(path.apiBaseUrl + `Hotel/PayCompany/${params.id}`, params);
  },
  del(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/PayCompany/${id}`);
  }
};
