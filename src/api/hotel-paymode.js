import axios from 'axios'
import path from './api'

export default {
  list (params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelPayMode/All')
  },
  detail (id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPayMode/${id}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPayMode', params)
  },
  edit (params) {
    return axios.put(
      path.apiBaseUrl + `Hotel/HotelPayMode/${params.id}`,
      params
    )
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPayMode/${id}`)
  }
}
