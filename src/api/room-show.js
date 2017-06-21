import axios from 'axios'
import path from './api'

export default {
  detailByRoomshowID (RoomshowID) {
    return axios.get(path.apiBaseUrl + `Hotel/RoomShow/${RoomshowID}`)
  },
  detailByRoomID (roomID) {
    return axios.get(path.apiBaseUrl + `Hotel/RoomShow/Room/${roomID}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'Hotel/RoomShow', params)
  },
  edit (params) {
    return axios.put(path.apiBaseUrl + 'Hotel/RoomShow', params)
  },
  del (roomID) {
    return axios.delete(path.apiBaseUrl + `Hotel/RoomShow/${roomID}`)
  }
}
