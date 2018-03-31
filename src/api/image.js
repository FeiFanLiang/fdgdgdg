import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/Image/'

export default {
  add (params) {
    return axios.post(base, params)
  },
  adds (params) {
    return axios.post(base+'IssueFile', params)
  }
}
