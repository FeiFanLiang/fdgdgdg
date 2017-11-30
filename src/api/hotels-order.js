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
  //PUT /Hotel/HotelOrder/SaveOrder
  edit (params) {
    return axios.post(base + 'SaveOrder', params)
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
  getOrderList(id){
    return axios.post(base + 'GetOrder/' + id)
  },
  //全部订单 GET /Hotel/HotelOrder/ListOrder
  fetch(params){
    return axios.get(base + 'ListOrder',{
      params: params
    })
  },
  //全部完成订单
  all(params){
    return axios.get(base + 'ListOrderEnd',{
      params: params
    })
  },
  //待回填列表  GET /Hotel/HotelOrder/ListDaiHuiTian
  back(params){
    return axios.get(base + 'ListDaiHuiTian',{
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
    return axios.post(base + 'SetCheckOrder/' + id)
  },
  //退改单列表  GET /Hotel/HotelOrder/ListDaiTuiGai
  tuigai(params){
    return axios.get(base + 'ListDaiTuiGai',{
      params: params
    })
  },
  //待截图列表    GET /Hotel/HotelOrder/ListDaiFaJieTu
  img(params){
    return axios.get(base + 'ListDaiFaJieTu',{
      params: params
    })
  },
  // 设置截图状态   POST /Hotel/HotelOrder/SetStateJieTu/{id}
  setImg(id){
    return axios.post(base + 'SetStateJieTu/' + id)
  },
  //待完结列表
  finsh(params){
    return axios.get(base + 'ListDaiWanJie',{
      params: params
    })
  },
  //完结
  finsh2 (id) {
    return axios.post(base + 'SetOverOrder/' + id)
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
  //付款  POST /Hotel/HotelOrder/OrderFuKuan/{ids}
  payhj(params){
    return axios.post(base + 'OrderFuKuan/' +params)
  },
  //保存付款信息  POST /Hotel/HotelOrder/OrderFuKuanSave
  paySave(params){
    return axios.post(base + 'OrderFuKuanSave',params)
  },
  //保存截图信息 POST /Hotel/HotelOrderPicture
  imgSave(params){
    return axios.post(base + 'HotelOrderPicture',params)
  },
  //收款   POST /Hotel/HotelOrder/OrderShouKuan/{ids}
  collection(params){
    return axios.post(base + 'OrderShouKuan/' +params)
  },
  //保存收款信息   POST /Hotel/HotelOrder/OrderShouKuanSave
  collectionSave(params){
    return axios.post(base + 'OrderShouKuanSave',params)
  },
}
