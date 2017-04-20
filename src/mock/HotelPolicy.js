import Mock from 'mockjs'
import {hotelpolicylist} from '../resources/hotelpolicylist';
let _hotelpolicy = hotelpolicylist

const API = {
    detailsById() {},
    detailsByPid() {},
    detailsByHotelid() {},
    listAll(config) {
        let {
            ID
        } = config.params
        let mockHotelpolicy = _hotelpolicy.filter(hotelpolicys => {
            if (ID && hotelpolicys.ID !== ID)
              return false
            return true
        })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let hotelpolicy_list = JSON.parse(JSON.stringify(mockHotelpolicy));
                resolve([
                    200, {
                        code: 200,
                        msg: '请求成功!!!',
                        hotelpolicy_list
                    }
                ])
            }, 500)
        })

    },
    add(config) {
        let {ID, PersonName, PurchasingName, PhoneNum, SecretType, ReserveMode, IsDefault} = JSON.parse(config.data)
        _hotelpolicy.push({ID: Mock.Random.natural( 0, 100 ), PersonName, PurchasingName, PhoneNum, SecretType, ReserveMode, IsDefault})
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ])
            })
        })
    },
     edit(config) {
        let {ID, PersonName, PurchasingName, PhoneNum, SecretType, ReserveMode, IsDefault} = JSON.parse(config.data)
        _hotelpolicy.some(hp => {
            if (hp.ID === ID) {
                hp.PersonName = PersonName || hp.PersonName
                hp.PurchasingName = PurchasingName || hp.PurchasingName
                hp.PhoneNum = PhoneNum || hp.PhoneNum
                hp.SecretType = SecretType || hp.SecretType
                hp.ReserveMode = ReserveMode || hp.ReserveMode
                hp.IsDefault = IsDefault || hp.IsDefault
                return true
            }
        })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '编辑成功'
                    }
                ])
            })
        })
    },
    remove(config) {
        let {ID} = JSON.parse(config.data)
        _hotelpolicy = _hotelpolicy.filter(p => p.ID !== ID)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '删除成功'
                    }
                ])
            })
        })
    }
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelPolicy/{id}').reply(API.detailsById)
        mock.onGet('/Hotel/HotelPolicy/Pid/{pid}').reply(API.detailsByPid)
        mock.onGet('/Hotel/HotelPolicy/Hotelid/{hotelid}').reply(API.detailsByHotelid)
        mock.onGet('/Hotel/HotelPolicy/all').reply(API.listAll)
        mock.onPost('/Hotel/HotelPolicy/add').reply(API.add)
        mock.onPut('/Hotel/HotelPolicy/edit/{id}').reply(API.edit)
        mock.onPost('/Hotel/HotelPolicy/remove/{id}').reply(API.remove)
    }
}
