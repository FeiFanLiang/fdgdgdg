 import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/Station/'

import {
  stationApi
} from '../config-data'

export default {
  getConfig: stationApi.getConfig,
  listByQuery(params) {
    return axios.get(base + 'list', {
      params: params
    })
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
 