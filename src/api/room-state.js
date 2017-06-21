import axios from 'axios'
import path from './api'
export default {
  detail (id) {
    return axios.get(path.apiBaseUrl + `Hotel/RoomState/${id}`)
  }
}
