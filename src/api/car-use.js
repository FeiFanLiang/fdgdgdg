import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarUse/'

import { carUseApi } from '../config-data'

export default {
  getConfig: carUseApi.getConfig,
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  }
}
