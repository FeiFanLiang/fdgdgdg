import axios from 'axios';
import path from './api';
let base = '';
export default {
  getList(params) {
    console.log('bbbbbbbbbbbbbbbb');
    console.log('ccccccccccccccc:' + params)
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/All`, { params: params });
  },
  getDetail(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/{id}`, params);
  },
  addInfo(params) {
    return axios.post(path.apiBaseUrl + `Hotel/PayCompany`, params);
  },
  editInfo(params) {
    return axios.put(path.apiBaseUrl + `Hotel/PayCompany/${id}`, params);
  },
  delInfo(params) {
    return axios.delete(path.apiBaseUrl + `Hotel/PayCompany/${id}`, params);
  }
};
