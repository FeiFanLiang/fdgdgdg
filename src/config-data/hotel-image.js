import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelImage/'

export default {
  listByHotelId (HotelID) {
    return axios.get(base + `Hotel/${HotelID}`)
  },
  listByRoomId (RoomID) {
    return axios.get(base + `Room/${RoomID}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base, params)
  },
  del (imgID) {
    return axios.delete(base + imgID)
  }
}
