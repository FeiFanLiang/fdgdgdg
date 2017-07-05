import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/RoomState/'
export default {
  detail (id) {
    return axios.get(base + id)
  }
}
