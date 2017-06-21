import axios from 'axios'
import path from './api'

export default {
  listByQuery (params) {
    return axios.get(path.apiBaseUrl + 'ParkSale/Driver/list', {
      params: params
    })
  },
  detail (id) {
    return axios.get(path.apiBaseUrl + `ParkSale/Driver/${id}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'ParkSale/Driver', params)
  },
  edit (id, params) {
    return axios.put(path.apiBaseUrl + `ParkSale/Driver/${id}`, params)
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `ParkSale/Driver/${id}`)
  }
}
