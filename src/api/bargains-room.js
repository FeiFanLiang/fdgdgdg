import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/BargainsRoom/'

export default {
  list (params) {
    return axios.get(base, {
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
