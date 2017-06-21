import axios from 'axios'
import path from './api'

export default {
  listByQuery (params) {
    return axios.get(path.apiBaseUrl + 'ParkSale/Car/list', { params: params })
  },
  detail (id) {
    return axios.get(path.apiBaseUrl + `ParkSale/Car/${id}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'ParkSale/Car', params)
  },
  edit (id, params) {
    return axios.put(path.apiBaseUrl + `ParkSale/Car/${id}`, params)
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `ParkSale/Car/${id}`)
  }
}
