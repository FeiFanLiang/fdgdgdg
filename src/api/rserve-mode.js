import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/RserveMode/'
export default {
  list (params) {
    return axios.get(base+'list', {
      params: params
    })
  }
}
