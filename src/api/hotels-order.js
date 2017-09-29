import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelOrder/'
const base2 = path.apiBaseUrl + 'System/Tag/'

import { hotelsOrderApi } from '../config-data'

export default {
  getConfig: hotelsOrderApi.getConfig,
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  detail (ID) {
    return axios.get(base + ID)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (ID,params) {
    return axios.put(base + ID, params)
  },
  del (ID) {
    return axios.delete(base + ID)
  },
  getState(){
    return axios.get(base2 + 'list')
  },
  img(ID){
    return axios.post(base + 'UploadPic/' + ID,ID)
  },
  //全部完成订单
  all(params){
    return axios.get(base + 'ListOrderEnd',{
      params: params
    })
  },
  //待审核列表
  check(params){
    return axios.get(base + 'ListDaiShenHe',{
      params: params
    })
  },
  //审核
  check2 (id) {
    return axios.post(base + 'SetCheckOrder' + id, id)
  },
  //待完结列表
  finsh(params){
    return axios.get(base + 'ListDaiWanJie',{
      params: params
    })
  },
  //完结
  finsh2 (id) {
    return axios.post(base + 'SetOverOrder' + id, id)
  },
  //待付款列表
  pay(params){
    return axios.get(base + 'ListDaiFuKuan',{
      params: params
    })
  },
  //待对账付款列表
  checkOut(params){
    return axios.get(base + 'ListDaiFuKuanCheck',{
      params: params
    })
  },
  //待对账收款列表
  checkIn(params){
    return axios.get(base + 'ListDaiShouKuanCheck',{
      params: params
    })
  },
}
