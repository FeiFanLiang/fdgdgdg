import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarArrange/'
import { carArrangeApi } from '../table-data'

<<<<<<< HEAD
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
        arrange(params) {
            return axios.get(base + 'Arrange', {
                params: params
            })
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
=======
export default {
  getConfig: carArrangeApi.getConfig,
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  },
  del (id) {
    return axios.delete(base + id)
  }
>>>>>>> e127e95df9e535401e7bbe043dadc03eecf1abcf
}
