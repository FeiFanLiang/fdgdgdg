import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPolicy/'

import { hotelPolicyApi } from '../config-data'

export default {
  getConfig: hotelPolicyApi.getConfig,
  listByID (id) {
    return axios.get(base + id)
  },
  listByHotelID (hotelid) {
    return axios.get(base + `Hotel/${hotelid}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (params) {
    return axios.put(base + params.ID, params)
  }
}
