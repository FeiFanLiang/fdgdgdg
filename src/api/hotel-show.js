import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelShow/'

export default {
  list () {
    return axios.get(base)
  },
  detail (HotelshowID) {
    return axios.get(base + HotelshowID)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base, params)
  },
  del (hotelID) {
    return axios.delete(base + hotelID)
  }
}
