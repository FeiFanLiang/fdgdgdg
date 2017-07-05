import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelArea/'
export default {
  listByPArea (PArea) {
    return axios.get(base + `pid/${PArea}`)
  },
  listByQuery (params = {}) {
    return axios.get(base + 'query', {
      params: params
    })
  },
  listByQue (que) {
    return axios.get(base + `query/${que}`)
  },
  listById (id) {
    return axios.get(base + id)
  }
}
