import axios from 'axios';
import path from './api';

export default {
  getList(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/All`, params);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/${id}`);
  },
  addInfo(params) {
    return axios.post(path.apiBaseUrl + `Hotel/PayCompany`, params);
  },
  editInfo(params) {
    return axios.put(path.apiBaseUrl + `Hotel/PayCompany/${params.ID}`, params);
  },
  delInfo(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/PayCompany/${id}`);
  }
};
