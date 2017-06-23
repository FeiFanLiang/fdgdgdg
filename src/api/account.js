import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Account/'
export default {
  login (params) {
    // let { username, password } = params;
    // params = `username=${username}&password=${password}`;
    // return axios.post(base + 'Login', params);
    return axios.post(base + 'Login', JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  register (params) {
    return axios.post(base + 'Register', params)
  },
  logout () {
    return axios.post(base + 'Logout')
  }
}
