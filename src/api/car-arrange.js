import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarArrange/'
import { carArrangeApi } from '../config-data'

export default {
  getConfig: carArrangeApi.getConfig,
  unArrangeOrderList (params) {
    return axios.get(base + 'UnArrangeOrder', {
      params: params
    })
  },
  arrangeOrderList (params) {
    return axios.get(base + 'ArrangeOrder', {
      params: params
    })
  },
  arrange (params) {
    return axios.get(base + 'Arrange', {
      params: params
    })
  },
  arrangeInterior (params) {
    return axios.get(base + 'ArrangeInterior', {
      params: params
    })
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base + params.id, params)
  },
  del (id) {
    return axios.delete(base + id)
  }
}
