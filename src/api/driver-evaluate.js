import axios from 'axios'
import path from './api'

export default {
  listByQuery (params) {
    return axios.get(
      path.apiBaseUrl + 'ParkSale/DriverEvaluate/AchievementStatistic',
      { params: params }
    )
  }
}
