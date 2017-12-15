import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPolicy/'
const base2 = path.apiBaseUrl + 'Hotel/HotelPayCompany/'

export default {
    //添加政策信息  POST /Hotel/HotelPolicy/AddPolicy
    addHotelPolicy(params){
        return axios.post(base + 'AddPolicy',params)
    },
    //获取我方账户信息  GET /Hotel/HotelPayCompany/GetMyCompany
    getPayCompany(){
        return axios.get(base2 + 'GetMyCompany')
    },
    //GET /Hotel/HotelPayCompany/{id}
    getPayCompanyID(id){
        return axios.get(base2 + id)
    }
}
