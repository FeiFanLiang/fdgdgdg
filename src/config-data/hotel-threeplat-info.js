import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelThreePlatInfo/'
export default {
  getList () {
    return axios.get(base)
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
