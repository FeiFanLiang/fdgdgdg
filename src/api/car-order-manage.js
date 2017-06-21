import axios from 'axios'
import path from './api'

export default {
  listByQuery (params) {
    return axios.get(path.apiBaseUrl + 'ParkSale/CarOrderManage/list', {
      params: params
    })
  },
  detail (id) {
    return axios.get(path.apiBaseUrl + `ParkSale/CarOrderManage/${id}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'ParkSale/CarOrderManage', params)
  },
  edit (id, params) {
    return axios.put(path.apiBaseUrl + `ParkSale/CarOrderManage/${id}`, params)
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `ParkSale/CarOrderManage/${id}`)
  }
}
