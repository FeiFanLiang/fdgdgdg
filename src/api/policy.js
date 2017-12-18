import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPolicy/'
const base2 = path.apiBaseUrl + 'Hotel/HotelPayCompany/'

export default {
    //添加政策信息  POST /Hotel/HotelPolicy/AddPolicy
    addHotelPolicy(params){
        return axios.post(base + 'AddPolicy',params)
    },
    //编辑政策信息
    editHotelPolicy(id,params){
        return axios.put(base + id,params)
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
        return axios.get(base + 'list' , {params,params})
    },
    //根据酒店ID获取政策信息  GET /Hotel/HotelPolicy/Hotel/{hotelid}
    getPolicyListByID(hotelid){
        return axios.get(base + 'Hotel/' + hotelid)
    },
    //根据ID获取政策信息  GET /Hotel/HotelPolicy/{id}
    getPolicyListID(id){
        return axios.get(base + id)
    },
}
