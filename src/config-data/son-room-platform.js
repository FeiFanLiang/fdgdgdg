import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/SonRoomPlatform/'
export default {
  detail (id) {
    return axios.get(base + id)
  },
  listByRoom (id) {
    return axios.get(base + `Room/${id}`)
  },
  listBySonRoom (id) {
    return axios.get(base + `SonRoom/${id}`)
  },
  listByHotel (id) {
    return axios.get(base + `Hotel/${id}`)
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
