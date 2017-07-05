import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelRoom/'
export default {
  list (pid) {
    return axios.get(base + `Hotel/${pid}`)
  },
  details (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  }
}
