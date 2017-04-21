import axios from 'axios';
import path from './api';

export default {
<<<<<<< HEAD
  getList(params) {
    console.log('bbbbbbbbbbbbbbbb');
    console.log('ccccccccccccccc:' + params)
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/All`, { params: params });
  },
  getDetail(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/{id}`, params);
  },
  getDetail(params) {
    return axios.get(path.apiBaseUrl + `Hotel/PayCompany/${id}`, params);
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
=======
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

>>>>>>> c40f64152661ed0afc17f908ee121703c551ab5d
};
