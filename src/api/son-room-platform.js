import axios from 'axios'
import path from './api'
export default {
  detail (id) {
    return axios.get(path.apiBaseUrl + `Hotel/SonRoomPlatform/${id}`)
  },
  listByRoom (id) {
    return axios.get(path.apiBaseUrl + `Hotel/SonRoomPlatform/Room/${id}`)
  },
  listBySonRoom (id) {
    return axios.get(path.apiBaseUrl + `Hotel/SonRoomPlatform/SonRoom/${id}`)
  },
  listByHotel (id) {
    return axios.get(path.apiBaseUrl + `Hotel/SonRoomPlatform/Hotel/${id}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'Hotel/SonRoomPlatform', params)
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `Hotel/SonRoomPlatform/${id}`)
  },
  edit (id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/SonRoomPlatform/${id}`, params)
  }
}
