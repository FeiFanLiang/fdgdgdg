import axios from 'axios';
import path from './api';
let base = '';
export default {
  getList(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/All`, { params: params });
  },
  getDetail(params) {
    return axios.get(`/Hotel/PayCompany/{id}`, params);
  },
  addInfo(params) {
    return axios.post(`/Hotel/PayCompany`, params);
  },
  editInfo(params) {
    return axios.put(`/Hotel/PayCompany/{id}`, params);
  },
  delInfo(params) {
    return axios.delete(`/Hotel/PayCompany/{id}`, params);
  }
};
