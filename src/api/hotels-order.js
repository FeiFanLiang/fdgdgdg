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
  //添加订单  POST /Hotel/HotelOrder/AddOrder
  add (params) {
    return axios.post(base + 'AddOrder' , params)
  },
  //根据第三方平台订单编号获取订单信息  GET /Hotel/HotelOrder/GetByPlatOrderNo/{PlatOrderNo}
  getDetail (PlatOrderNo) {
    return axios.get(base + 'GetByPlatOrderNo/' + PlatOrderNo)
  },
  //编辑订单  PUT /Hotel/HotelOrder/SaveOrder
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
  //审核保存 POST /Hotel/HotelOrder/ConfirmOrder
  checkSave (params) {
    return axios.post(base + 'ConfirmOrder',params)
  },
  //退改单列表  GET /Hotel/HotelOrder/ListDaiTuiGai
  tuigai(params){
    return axios.get(base + 'ListDaiTuiGai',{
      params: params
    })
  },
  //废单审核  POST /Hotel/HotelOrder/SetObsoleteOrder/{id}
  obsoleteCheck(id){
    return axios.get(base + 'SetInvalidOrder/' + id)
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
  //设置完结
  finsh2 (id) {
    return axios.post(base + 'SetOverOrder/' + id)
  },
  //全部完成订单列表  /Hotel/HotelOrder/ListOverOrder
  endList(params){
    return axios.get(base + 'ListOverOrder',{
      params: params
    })
  },
  // 提示 需要处理的数量  GET /Hotel/HotelOrder/Tips 
  tips(){
    return axios.get(base + 'Tips')
  }
}
