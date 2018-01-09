import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Account/Login'
export default {
    login(params) {
        // let url = ''
        // if (window.location.host.indexOf('192.168') > -1) {
        //   url = base
        // } else {
        //   url = 'http://' + window.location.host + '/Account/Login'
        // }

        return axios.post(base, JSON.stringify(params), {
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
    register(params) {
        return axios.post(base + 'Register', params)
    },
    logout() {
        return axios.post(base + 'Logout')
    }
}