import axios from 'axios'
import path from './api'
export default {
  listByID (id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPolicy/${id}`)
  },
  listByHotelID (hotelid) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPolicy/Hotel/${hotelid}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPolicy', params)
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPolicy/${id}`)
  },
  edit (params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelPolicy/${params.ID}`, params)
  }
}
