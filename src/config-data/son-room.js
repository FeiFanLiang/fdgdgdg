import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/SonRoom/'
export default {
  detailById (id) {
    return axios.get(base + id)
  },
  detailRoomById (id) {
    return axios.get(base + `Room/${id}`)
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
