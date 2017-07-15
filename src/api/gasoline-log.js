import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/GasolineLog/'

export default {
    list(params) {
            return axios.get(base + 'list')
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
