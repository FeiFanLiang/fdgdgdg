import axios from 'axios'
import path from './api'
export default {
  detailById (id) {
    return axios.get(path.apiBaseUrl + `Hotel/SonRoom/${id}`)
  },
  detailRoomById (id) {
    return axios.get(path.apiBaseUrl + `Hotel/SonRoom/Room/${id}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'Hotel/SonRoom', params)
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `Hotel/SonRoom/${id}`)
  },
  edit (id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/SonRoom/${id}`, params)
  }
}
