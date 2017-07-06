import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarArrange/'
import { carArrangeApi } from '../table-data'

const listFields = [
    { label: 'CarID', name: 'CarID', is: true },
    { label: 'DriverID', name: 'DriverID', is: true },
    { label: '始发地', name: 'Origin', is: true },
    { label: '目的地', name: 'Destination', is: true },
    { label: '预计行车时间', name: 'PredictTime', is: true },
    { label: '预计里程', name: 'PredictMileage', is: true },
    { label: '派单人员', name: 'ArrangeUserID', is: true },
    { label: '派单时间', name: 'ArrangeTime', is: true },
    { label: '备注', name: 'Remark', is: true }
]
const searchFields = {}
export default {
    getConfig() {
            return { listFields, searchFields }
        },
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
        arrange(a,b,c,params) {
            return axios.post(base+`Arrange?orderID=${a}&CarID=${b}&DriverID=${c}`, params)
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
