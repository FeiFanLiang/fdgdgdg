import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'WeixinRedirect/WeixinRedirect/'
export default {
  list () {
    return axios.get(base + `GetMenu`)
  },
  add (params) {
    return axios.post(base + `CreateMenu`,params)
  },
  del () {
    return axios.post(base + `DeleteMenu`)
  },
  url(code){
    return axios.get(base + `GetQrWithArg/` + code,code)
  }
}
