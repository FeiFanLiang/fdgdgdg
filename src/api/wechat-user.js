import axios from 'axios'
import path from './api'
// GET /WeixinRedirect/WeixinRedirect/GetUserList
const base = path.apiBaseUrl + 'WeixinRedirect/WeixinRedirect/'

export default {
  list (params) {
    return axios.get(base + 'GetUserList',{ params: params })
  }
}
