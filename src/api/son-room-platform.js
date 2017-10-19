import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/SonRoomPlatform/'

export default {
  detail (id) {
    return axios.get(base + id)
  },
  listByRoom (pid) {
    return axios.get(base + `Room/${pid}`)
  },
  listBySonRoom (pid) {
    return axios.get(base + `SonRoom/${pid}`)
  },
  listByHotel (pid) {
    return axios.get(base + `Hotel/${pid}`)
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
