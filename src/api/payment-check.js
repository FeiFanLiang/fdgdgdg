import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPayment/'
const base2 = path.apiBaseUrl + 'Hotel/HotelOrderAddition/'

export default {
    listByQuery (params) {
        return axios.get(base + 'list', {
            params: params
        })
    },
    detail(orderid) {
        return axios.post(base + `ListPayment/${orderid}`)
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
    }
}
