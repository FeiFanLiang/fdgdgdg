import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPayCompany/'
import {
  payCompanyApi
} from '../config-data'

export default {
  getConfig: payCompanyApi.getConfig,
  //GET /Hotel/HotelPayCompany/All
  //GET /Hotel/HotelPayCompany/list
  list(params) {
    return axios.get(base + 'list',{params:params})
  },
  //GET /Hotel/HotelPayCompany/GetMyCompany
  getMyCompany(){
    return axios.get(base + 'GetMyCompany')
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
