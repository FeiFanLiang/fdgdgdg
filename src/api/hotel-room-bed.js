import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelRoomBed/'
export default {
  list (params) {
    return axios.get(base, {
      params: params
    })
  },
  details (id) {
    return axios.get(base + id)
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
