import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPolicyImage/'
export default {
  detailsById (id) {
    return axios.get(base + id)
  },
  listByPid (id) {
    return axios.get(base + `Pid/${id}`)
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
