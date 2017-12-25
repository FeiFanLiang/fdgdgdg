import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'WeiMP/Visa/'
export default {
  getList (params) {
    return axios.get(base + 'list', { params: params })
  },
}
