import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarUse/'

const listFields = [
  { label: '车型', name: 'Car.CarMode', is: true },
  { label: '司机姓名', name: 'Driver.Name', is: true },
  { label: '始发地', name: 'Origin', is: true },
  { label: '目的地', name: 'Destination', is: true },
  { label: '起始里程数', name: 'StartMileage', is: true },
  { label: '结束里程数', name: 'EndMileage', is: true },
  { label: '开始时间', name: 'StartTime', is: true },
  { label: '结束时间', name: 'EndTime', is: true },
  { label: '渠道', name: 'Channel', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  }
}
