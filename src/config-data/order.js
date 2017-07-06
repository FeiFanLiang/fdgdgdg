import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/Order/'
export default {
  getList (params) {
    return axios.get(base + 'All', { params: params })
  },
  getDetail (id) {
    return axios.get(base + id)
  },
  editInfo (id, params) {
    return axios.put(base + id, params)
  }
}
