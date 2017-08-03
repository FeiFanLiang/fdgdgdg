import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Account/'
export default {
  login (params) {
    console.log(window.location.host)
    return axios.post('http://'+window.location.host + '/Account/Login', JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  // login (params) {
  //   return axios.post(base + 'Login', JSON.stringify(params), {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // },
  register (params) {
    return axios.post(base + 'Register', params)
  },
  logout () {
    return axios.post(base + 'Logout')
  }
}
