import axios from 'axios'
import path from './api'
let base = ''
export default {

    getList(params) {
        return axios.get(`/Hotel/HotelPayMode/All`, {params:params})
    },
    getDetail(params) {
        return axios.get(`/Hotel/HotelPayMode/{id}`, params)
    },
    addInfo(params) {
        return axios.post(`/Hotel/HotelPayMode`, params)
    },
    editInfo(params) {
        return axios.put(`/Hotel/HotelPayMode/{id}`, params)
    },
    delInfo(params) {
        return axios.delete(`/Hotel/HotelPayMode/{id}`, params)
    },

}
