import axios from 'axios';
import path from './api';
// GET /System/Role
// GET /System/Role/{rolsName}
// GET /System/Role/ForUser/{userName}
// GET /System/Role/LockUser/{userName}
// GET /System/Role/UnLockUser/{userName}
// GET /System/Role/RestUserPassword/{userName}
// GET /System/Role/Init
// POST /System/Role/{rolsName}/{userName}
// POST /System/Role/ForUser/{userName}/{rolsName}
// POST /System/Role/CraateUser
// DELETE /System/Role/{rolsName}/{userName}
// DELETE /System/Role/ForUser/{userName}/{rolsName}
export default {
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `System/Role/${id}`);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `System/Role/${id}`);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `System/Role/${id}`);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `System/Role/${id}`);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `System/Role/${id}`);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `System/Role/${id}`);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `System/Role/${id}`);
  },
  editInfo(id, params) {
    return axios.post(path.apiBaseUrl + `System/Role/${id}`, params);
  },
  editInfo(id, params) {
    return axios.post(path.apiBaseUrl + `System/Role/${id}`, params);
  },
  editInfo(id, params) {
    return axios.post(path.apiBaseUrl + `System/Role/${id}`, params);
  },
  editInfo(id, params) {
    return axios.delete(path.apiBaseUrl + `System/Role/${id}`, params);
  },
  editInfo(id, params) {
    return axios.delete(path.apiBaseUrl + `System/Role/${id}`, params);
  }
};
