import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarUse/'

export default {
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  }
}
