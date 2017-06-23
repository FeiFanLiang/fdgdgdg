import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/PayCompany/'

export default {
  list (params) {
    return axios.get(base + `All`, params)
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base + params.id, params)
  },
  del (id) {
    return axios.delete(base + id)
  }
}
