import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPaymentInfo/'
const base2 = path.apiBaseUrl + 'Hotel/PlatformAccount/'
const base3 = path.apiBaseUrl + 'Hotel/PayCompany/'

export default {
    //GET /Hotel/HotelPaymentInfo/GetRefPaymentInfo/{orderId}
    getPaymentInfo(orderId) {
        return axios.get(base + `GetRefPaymentInfo/${orderId}`)
    },
    //POST /Hotel/HotelPaymentInfo/SetPaymentInfo
    savePaymentInfo(params){
        return axios.post(base + 'SetPaymentInfo', params)
    },
    //  GET /Hotel/PlatformAccount/GetInfo/{id}
    getAccount(id){
        return axios.get(base2 + `GetInfo/${id}`)
    },
    getAccountDetail(id){
        return axios.get(base3 + id)
    }
}
