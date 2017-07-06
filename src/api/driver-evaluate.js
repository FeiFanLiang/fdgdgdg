import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/DriverEvaluate/'

import { driverEvaluateApi } from '../config-data'

export default {
  getConfig: driverEvaluateApi.getConfig,
  listByQuery (params) {
    return axios.get(base + 'AchievementStatistic', { params: params })
  }
}
