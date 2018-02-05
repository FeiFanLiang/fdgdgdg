import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPayment/'
const base2 = path.apiBaseUrl + 'Hotel/HotelOrderAddition/'
const base3 = path.apiBaseUrl + 'Hotel/HotelPaymentInfo/'

export default {
    listByQuery (params) {
        return axios.get(base + 'list', {
            params: params
        })
    },
    detail(orderid) {
        return axios.post(base + `ListPayment/${orderid}`)
    },
    // 获取账号信息  GET /Hotel/HotelPaymentInfo/ListPaymentByDetail/{id}
    getAccount(orderid) {
        return axios.get(base3 + `ListPaymentByDetail/${orderid}`)
    },
    listOrder(id){
        return axios.post(base + `ListOrder/${id}`)
    },
    fujiaList(params){
        return axios.get(base2 + 'list',{
            params: params
        })
    },
    addFujia(params){
        return axios.post(base2,params)
    },
    putImg(params){
        return axios.put(base + params.ID,params)
    }
}
