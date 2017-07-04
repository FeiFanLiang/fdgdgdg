import lib from './lib'
import { carArrangeApi } from 'api'

const data = [
  ['CarID', 'CarID', true, true, 'string'],
  ['DriverID', 'DriverID', true, true, 'string'],
  ['始发地', 'Origin', true, true, 'string'],
  ['目的地', 'Destination', true, true, 'string'],
  ['预计行车时间', 'PredictTime', true, true, 'string'],
  ['预计里程', 'PredictMileage', true, true, 'string'],
  ['派单人员', 'ArrangeUserID', true, false, 'select'],
  ['派单时间', 'ArrangeTime', true, false, 'date'],
  ['备注', 'Remark', true, true, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: carArrangeApi.edit
    }
  }
}
