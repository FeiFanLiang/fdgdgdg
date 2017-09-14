import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/BargainsRoom/'

import { bargainsRoomApi } from '../config-data'

export default {
  getConfig: bargainsRoomApi.getConfig,
  list (params) {
    return axios.get(base+'BargainsRoom', {
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
    return axios.put(base, params)
  }
}
