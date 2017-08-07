import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Account/Login'
export default {
  login (params) {
    console.log(window.location.host)
    let url = ''
    if (window.location.host.indexOf('localhost') > -1) {
      url = base
    } else {
      url = 'http://' + window.location.host + '/Account/Login'
    }

    return axios.post(url, JSON.stringify(params), {
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
