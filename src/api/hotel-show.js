import axios from 'axios'
import path from './api'

export default {
  list () {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelShow')
  },
  detail (HotelshowID) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelShow/${HotelshowID}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelShow', params)
  },
  edit (params) {
    return axios.put(path.apiBaseUrl + 'Hotel/HotelShow', params)
  },
  del (hotelID) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelShow/${hotelID}`)
  }
}
