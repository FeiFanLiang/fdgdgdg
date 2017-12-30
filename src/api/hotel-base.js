import axios from 'axios'
import path from './api'

const base = path.apiBaseUrl + 'Hotel/HotelBase/'
import {
  hotelBaseApi
} from '../config-data'

export default {
  getConfig: hotelBaseApi.getConfig,
  listAll(params = {}) {
    return axios.get(base + 'list/', {
      params: params
    })
  },
  listByQuery(params) {
    return axios.get(base, {
      params: params
    })
  },
  listDefault() {
    return axios.get(base + 'default')
  },
  detailsById(id) {
    return axios.get(base + id)
  },
  detailsByHotelNum(id) {
    return axios.get(base + `HotelNum/${id}`)
  },
  add(params) {
    return axios.post(base, params)
  },
  del(id) {
    return axios.delete(base + id)
  },
  edit(params) {
    return axios.put(base + params.id, params)
  }
}
