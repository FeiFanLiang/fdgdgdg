import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'System/User/'
export default {
  list () {
    return axios.get(base)
  },
  lockUser (userName) {
    return axios.get(base + `LockUser/${userName}`)
  },
  unLockUser (userName) {
    return axios.get(base + `UnLockUser/${userName}`)
  },
  restUserPassword (userName) {
    return axios.get(base + `RestUserPassword/${userName}`)
  },
  add (params) {
    return axios.post(base, params)
  }
}
