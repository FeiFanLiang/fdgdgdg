import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/RoomShow/'

import { roomShowApi } from '../config-data'

export default {
  getConfig: roomShowApi.getConfig,
  detailByRoomshowID (RoomshowID) {
    return axios.get(base + RoomshowID)
  },
  detailByRoomID (roomID) {
    return axios.get(base + `Room/${roomID}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base, params)
  },
  del (roomID) {
    return axios.delete(base + roomID)
  }
}
