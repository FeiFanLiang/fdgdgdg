import axios from 'axios'
import path from './api'
const base = 'http://192.168.10.10:8500/' + 'Hotel/HotelArea/'
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
