import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/OrderChannel/'

export default {

    channelByQuery(business) {
            return axios.get(base + 'list/' + business)
        },
        list() {
            return axios.get(base)
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
