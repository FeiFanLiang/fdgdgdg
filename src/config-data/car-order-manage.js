import lib from './lib'
import { carOrderManageApi } from 'api'

const listData = [
    ['渠道', 'Channel', true, false, 'string'],
    ['外部订单号', 'ExternalOrderID', true, false, 'string'],
    ['联系人', 'LinkName', true, false, 'string'],
    ['联系电话', 'LinkPhone', true, false, 'string'],
    ['航班/车次', 'CarriageNo', true, false, 'string'],
    ['产品类型', 'CarTransportType', true, false, 'string'],
    ['车型类别', 'CarClassify', true, false, 'string'],
    ['用车时间', 'UseTime', true, false, 'string'],
    ['始发地', 'Origin', true, false, 'string'],
    ['目的地', 'Destination', true, false, 'string'],
    ['预计服务里程', 'PreServiceMileage', true, true, 'string'],
    ['预计服务用时', 'PreServiceTime', true, true, 'string'],
    ['订单备注', 'Remark', true, true, 'string'],
    ['是否支付', 'PayStatus', true, true, 'string'],
    ['是否取消', 'IsCancel', true, true, 'string'],
    ['是否退款', 'IsCancelPrice', true, true, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
    getConfig() {
        return {
            listFields: listFields,
            searchFields: searchFields,
            editMethod: carOrderManageApi.edit
        }
    }
}
