import lib from './lib'
import { carUseApi } from 'api'

const data = [
  ['车型', 'Car.CarMode', true, false, 'string'],
  ['司机姓名', 'Driver.Name', true, false, 'string'],
  ['始发地', 'Origin', true, false, 'string'],
  ['目的地', 'Destination', true, false, 'string'],
  ['起始里程数', 'StartMileage', true, false, 'string'],
  ['结束里程数', 'EndMileage', true, false, 'string'],
  ['开始时间', 'StartTime', true, false, 'string'],
  ['结束时间', 'EndTime', true, false, 'string'],
  ['渠道', 'Channel', true, false, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: carUseApi.edit
    }
  }
}
