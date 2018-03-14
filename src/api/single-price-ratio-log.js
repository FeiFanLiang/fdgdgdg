import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/SinglePriceRatioLog/'

export default {
  list() {
    return axios.get(base + 'list/')
  }
}
