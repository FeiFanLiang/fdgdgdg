import axios from 'axios';
import path from './api';
export default {
  list() {
    return axios.get(path.apiBaseUrl + 'System/User');
  },
  lockUser(userName) {
    return axios.get(path.apiBaseUrl + `System/User/LockUser/${userName}`);
  },
  unLockUser(userName) {
    return axios.get(path.apiBaseUrl + `System/User/UnLockUser/${userName}`);
  },
  restUserPassword(userName) {
    return axios.get(
      path.apiBaseUrl + `System/User/RestUserPassword/${userName}`
    );
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'System/User', params);
  }
};
