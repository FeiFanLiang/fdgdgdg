import axios from 'axios'
import path from './api'
export default {
  login (params) {
    // let { username, password } = params;
    // params = `username=${username}&password=${password}`;
    // return axios.post(path.apiBaseUrl + 'Account/Login', params);
    return axios.post(
      path.apiBaseUrl + 'Account/Login',
      JSON.stringify(params),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  },
  register (params) {
    return axios.post(path.apiBaseUrl + 'Account/Register', params)
  },
  logout () {
    return axios.post(path.apiBaseUrl + 'Account/Logout')
  }
}
