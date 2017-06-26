import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'WeixinRedirect/WeixinRedirect/'
export default {
  list () {
    return axios.get(base + `GetMenu`)
  },
  add () {
    return axios.post(base + `CreateMenu`)
  },
  del () {
    return axios.post(base + `DeleteMenu`)
  }
}
