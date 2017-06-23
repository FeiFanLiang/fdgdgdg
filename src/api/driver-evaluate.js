import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/DriverEvaluate/'

export default {
  listByQuery (params) {
    return axios.get(base + 'AchievementStatistic', { params: params })
  }
}
