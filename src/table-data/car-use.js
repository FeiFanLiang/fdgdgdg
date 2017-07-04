// const listFields = [
//    '车型',  'Car.CarMode',  true ],
//    '司机姓名',  'Driver.Name',  true ],
//    '始发地',  'Origin',  true ],
//    '目的地',  'Destination',  true ],
//    '起始里程数',  'StartMileage',  true ],
//    '结束里程数',  'EndMileage',  true ],
//    '开始时间',  'StartTime',  true ],
//    '结束时间',  'EndTime',  true ],
//    '渠道',  'Channel',  true ]
// ]

import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['账户名称', 'ModeName', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string'],
  ['ID', 'ID', true, false, 'string']
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
