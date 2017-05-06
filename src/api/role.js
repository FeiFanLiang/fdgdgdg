import axios from 'axios';
import path from './api';

export default {
  list() {
    return axios.get(path.apiBaseUrl + 'System/Role');
  },
  RoleListByRolsName(rolsName) {
    return axios.get(path.apiBaseUrl + `System/Role/${rolsName}`);
  },
  RoleListByUserName(userName) {
    return axios.get(path.apiBaseUrl + `System/Role/ForUser/${userName}`);
  },
  add(rolsName, userName, params) {
    return axios.post(
      path.apiBaseUrl + `System/Role/${rolsName}/${userName}`,
      params
    );
  },
  deleteByUserName(rolsName, userName) {
    return axios.delete(
      path.apiBaseUrl + `System/Role/${rolsName}/${userName}`
    );
  },
  deleteByRolsName(rolsName, userName) {
    return axios.delete(
      path.apiBaseUrl + `System/Role/ForUser/${userName}/${rolsName}`
    );
  }
};
