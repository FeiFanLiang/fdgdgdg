import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelArea/'
export default {
  listByLevel(level) {
    return axios.get(base + `level/${level}`)
  },
  listByLevelAndQuery(level, query) {
    return axios.get(base + `level/${level}/${query}`)
  },
  listByQuery(query) {
    return axios.get(base + `query/${query}`)
  }
}
