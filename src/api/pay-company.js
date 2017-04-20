import axios from 'axios';
import path from './api';

export default {
  getList(params) {
<<<<<<< HEAD
    console.log('bbbbbbbbbbbbbbbb');
    console.log('ccccccccccccccc:' + params)
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/All`, { params: params });
  },
  getDetail(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/{id}`, params);
=======
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/All`, {
      params: params
    });
  },
  getDetail(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/${id}`, params);
>>>>>>> c1239effdbb7a4099c03947dfccc648148fa8dc7
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
