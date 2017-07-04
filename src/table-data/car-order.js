import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarOrder/'
export default {
  listByPhone (Phone) {
    return axios.get(base + `Phone/${Phone}`)
  },
  listByTime () {
    return axios.get(base + `now`)
  }
}
