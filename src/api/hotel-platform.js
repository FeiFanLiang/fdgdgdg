import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPlatform/'
export default {
  listByHotel (hotelid) {
    return axios.get(base + `hotel/${hotelid}`)
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (params) {
    return axios.put(base + params.id, params)
  },

  getPlatformList (platid) {
    return axios.get(base + `plat/${platid}`)
  }
}
