import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPolicy/'
const base2 = path.apiBaseUrl + 'Hotel/HotelPayCompany/'
const base3 = path.apiBaseUrl + 'Hotel/RserveMode/'
const base4 = path.apiBaseUrl + 'Hotel/PlatformAccount/'
const base5 = path.apiBaseUrl + 'Hotel/HotelThreePlatInfo'

export default {
    //添加政策信息  POST /Hotel/HotelPolicy/AddPolicy
    addHotelPolicy(params){
        return axios.post(base + 'AddPolicy',params)
    },
    //编辑政策信息  POST /Hotel/HotelPolicy/UpdatePolicy/{id}
    editHotelPolicy(id,params){
        return axios.post(base + 'UpdatePolicy/' + id, params)
    },
    //获取我方账户信息  GET /Hotel/HotelPayCompany/GetMyCompany
    getPayCompany(){
        return axios.get(base2 + 'GetMyCompany')
    },
    //GET /Hotel/HotelPayCompany/{id}
    getPayCompanyID(id){
        return axios.get(base2 + id)
    },
    //获取政策信息列表  GET /Hotel/HotelPolicy/list
    getPolicyList(params){
        return axios.get(base + 'list' , {params:params})
    },
    //根据酒店ID获取政策信息  GET /Hotel/HotelPolicy/Hotel/{hotelid}
    getPolicyListByID(hotelid){
        return axios.get(base + 'Hotel/' + hotelid)
    },
    //根据ID获取政策信息  GET /Hotel/HotelPolicy/{id}
    getPolicyListID(id){
        return axios.get(base + id)
    },
    //获取酒店预定方式 GET /Hotel/RserveMode/list
    getRserveMode(){
        return axios.get(base3 + 'list')
    },
    //获取平台政策列表  GET /Hotel/PlatformAccount/list
    getPolicyPlatform(params){
        return axios.get(base4 + 'list' , {params:params})
    },
    //获取平台列表  GET /Hotel/HotelThreePlatInfo
    getPlatform(){
        return axios.get(base5)
    },
    //根据ID获取平台政策列表
    getPolicyPlatformID(id){
        return axios.get(base4 + id)
    },
    //添加平台政策 POST /Hotel/PlatformAccount
    addPlatformPolicy(params){
        return axios.post(base4 , params)
    },
    //编辑平台政策  PUT /Hotel/PlatformAccount/{id}  POST /Hotel/PlatformAccount/UpdatePolicy/{id}
    editPlatformPolicy(id,params){
        return axios.post(base4 + 'UpdatePolicy/' + id , params)
    },
    
}
