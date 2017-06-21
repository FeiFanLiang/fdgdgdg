import axios from 'axios'
import path from './api'

export default {
  listByQuery (params) {
    return axios.get(path.apiBaseUrl + 'ParkSale/CarArrange/list', {
      params: params
    })
  },
  detail (id) {
    return axios.get(path.apiBaseUrl + `ParkSale/CarArrange/${id}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'ParkSale/CarArrange', params)
  },
  edit (id, params) {
    return axios.put(path.apiBaseUrl + `ParkSale/CarArrange/${id}`, params)
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `ParkSale/CarArrange/${id}`)
  }
}
