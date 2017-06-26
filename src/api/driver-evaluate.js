import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/DriverEvaluate/'

const listFields = [
  { label: 'ID', name: 'ID', is: true },
  { label: '工号', name: 'Driver', is: true },
  { label: '司机姓名', name: 'Openid', is: true },
  { label: '关注人次', name: 'field3', is: true },
  { label: '评论次数', name: 'field1', is: true },
  { label: '总分', name: 'Rate', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  listByQuery (params) {
    return axios.get(base + 'AchievementStatistic', { params: params })
  }
}
