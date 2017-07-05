import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['车型', 'Car.CarMode', true, true, 'string'],
  ['司机姓名', 'Driver.Name', true, true, 'string'],
  ['始发地', 'Origin', true, true, 'string'],
  ['目的地', 'Destination', true, true, 'string'],
  ['起始里程数', 'StartMileage', true, true, 'string'],
  ['结束里程数', 'EndMileage', true, true, 'string'],
  ['开始时间', 'StartTime', true, true, 'string'],
  ['结束时间', 'EndTime', true, true, 'string'],
  ['渠道', 'Channel', true, true, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: hotelPayModeApi.edit
    }
  }
}
