import axios from 'axios'
import path from './api'
let base = ''
export default {

    getList(params) {
        return axios.get(`/Hotel/Order/All`, {params:params})
    },
    getDetail(params) {
        return axios.get(`/Hotel/Order/{id}`, params)
    },
    editInfo(params) {
        return axios.put(`/Hotel/Order/{id}`, params)
    },
}
