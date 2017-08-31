import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/GasolineLog/'

export default {
        cardList(params) {
           return axios.get(base + 'GetGasolineCardList', {params:params})
        },
        list(params) {
            return axios.get(base + 'list', {params:params})
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
