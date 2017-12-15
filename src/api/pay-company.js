import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPayCompany/'
import {
  payCompanyApi
} from '../config-data'

export default {
  getConfig: payCompanyApi.getConfig,
  //GET /Hotel/HotelPayCompany/All
  list() {
    return axios.get(base + 'All')
  },
  detail(id) {
    return axios.get(base + id)
  },
  add(params) {
    return axios.post(base, params)
  },
  edit(params) {
    return axios.put(base + params.id, params)
  },
  del(id) {
    return axios.delete(base + id)
  }
}
