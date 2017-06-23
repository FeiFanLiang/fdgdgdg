import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPayMode/'

export default {
  list (params) {
    return axios.get(base + 'All')
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
