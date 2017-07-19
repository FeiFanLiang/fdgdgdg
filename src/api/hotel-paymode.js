import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPayMode/'
import {
  hotelPayModeApi
} from '../config-data'

export default {
  getConfig: hotelPayModeApi.getConfig,
  list(params) {
    return axios.get(base + 'All')
  },
  detail(id) {
    return axios.get(base + id)
  },
  add(params) {
    return axios.post(base, params)
  },
  edit(id, params) {
    return axios.put(base + id, params)
  },
  del(id) {
    return axios.delete(base + id)
  }
}
