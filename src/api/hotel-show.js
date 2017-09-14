import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelShow/'

import { hotelShowApi } from '../config-data'

export default {
  getConfig: hotelShowApi.getConfig,
  list() {
    return axios.get(base)
  },
  detail(HotelshowID) {
    return axios.get(base + HotelshowID)
  },
  add(params) {
    return axios.post(base, params)
  },
  edit(id, params) {
    return axios.put(base + id, params)
  },
  del(hotelID) {
    return axios.delete(base + hotelID)
  }
}
