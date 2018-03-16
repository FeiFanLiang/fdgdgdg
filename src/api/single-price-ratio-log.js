import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/SinglePriceRatioLog/'

export default {
  list(params) {
    return axios.get(base + 'list/', {
      params: params
    })
  },
  del(id) {
    return axios.delete(base + `${id}`)
  }
}
