import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Weixin/WeixinScanCode/'
const base2='http://weixinredirect.qdjp.cn/' + 'WeixinRedirect/WeixinRedirect/'
export default {
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  edit(id,params) {
    return axios.put(base + id, params)
  },
  url(code){
    return axios.post(base2 + GetQrWithArg + code,code)
  }}
