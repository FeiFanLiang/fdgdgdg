import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarArrange/'
import { carArrangeApi } from '../config-data'

export default {
    getConfig: carArrangeApi.getConfig,
    unArrangeOrderList(params) {
        return axios.get(base + 'UnArrangeOrder', {
            params: params
        })
    },
    arrangeOrderList(params) {
        return axios.get(base + 'ArrangeOrder', {
            params: params
        })
    },
    arrange(params) {
        return axios.post(base + 'Arrange', params)
    },
    editArrange(params) {
        return axios.put(base + 'Arrange', params)
    },
    arrangeInterior(params) {
        return axios.get(base + 'ArrangeInterior', {
            params: params
        })
    },
    detail(id) {
        return axios.get(base + id)
    },
    add(params) {
        return axios.post(base, params)
    },
    edit(id, params) {
        return axios.put(base + id, params)
    },
    del(id) {
        return axios.delete(base + id)
    }

}
