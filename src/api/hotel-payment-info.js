import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPaymentInfo/'
const base2 = path.apiBaseUrl + 'Hotel/PlatformAccount/'
const base3 = path.apiBaseUrl + 'Hotel/HotelPayCompany/'
const base4 = path.apiBaseUrl + 'Hotel/HotelPayment/'

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
    },
    //待付款列表
    pay(params){
        return axios.get(base + 'ListDaiFuKuan',{
            params: params
        })
    },
    //保存付款信息  POST /Hotel/HotelPaymentInfo/OrderFuKuanSave
    paySave(params){
        return axios.post(base + 'OrderFuKuanSave',params)
    },

    //待对账付款列表
    checkOut(params){
        return axios.get(base + 'ListDaiFuKuanCheck',{
            params: params
        })
    },
    //对账付款状态审核  GET /Hotel/HotelPaymentInfo/OrderFuKuanCheckSave/{paymentId}
    checks(paymentId){
        return axios.get(base + 'OrderFuKuanCheckSave/' + paymentId)
    },
    //合并收付款列表  GET /Hotel/HotelPaymentInfo/PaymentCheckList/{ids}
    payhj(params){
        return axios.get(base + 'PaymentCheckList/' + params)
    },
    //待对账收款列表
    checkIn(params){
        return axios.get(base + 'ListDaiShouKuan',{
            params: params
        })
    },
    //保存收款信息   POST /Hotel/HotelPaymentInfo/OrderShouKuanSave
    collectionSave(params){
        return axios.post(base + 'OrderShouKuanSave',params)
    },

    //获取订单详细信息  GET /Hotel/HotelPaymentInfo/ListByPaymentID/{PaymentId}
    getDetails(paymentId){
        return axios.get(base + 'ListByPaymentID/' + paymentId)
    },
    //待发截图列表  /Hotel/HotelPayment/ListDaiFaJieTu
    imgList(params){
        return axios.get(base4 + 'ListDaiFaJieTu',{
            params:params
        })
    },
    //修改发送截图状态  GET /Hotel/HotelPayment/SetSendState/{id}
    imgState(id){
        return axios.get(base4 + 'SetSendState/' + id)
    },
    //待截图列表  GET /Hotel/HotelPayment/ListDaiJieTu
    getImgList(params){
        return axios.get(base4 + 'ListDaiJieTu',{
            params:params
        })
    },
    // GET /Hotel/HotelPayment/{id}
    getImgById(id){
        return axios.get(base4 + id)
    },
    //保存截图信息 PUT /Hotel/HotelPayment/{id}
    saveImg(params){
        return axios.put(base4 + params.ID,params)
    }
}
