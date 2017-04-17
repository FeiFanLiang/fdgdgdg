import Mock from 'mockjs'
import {platforminfo} from '../resources/platforminfo';
let _platforminfo = platforminfo

const API = {
    detailsById() {},
    detailsByHotelid() {},
    detailsByPlatid() {},
    listAll(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let platforminfo_list = JSON.parse(JSON.stringify(platforminfo));
                resolve([
                    200, {
                        code: 200,
                        msg: '请求成功!!!',
                        platforminfo_list
                    }
                ])
            }, 500)
        })

    },
    add(config) {
        let {ID, PlatformID, HotelID, PlatHotelID, PlatURL, PlatHotelName, PlatHotelName_En, Remark} = JSON.parse(config.data)
        _platforminfo.push({ID: Mock.Random.natural( 0, 100 ), PlatformID, HotelID, PlatHotelID, PlatURL, PlatHotelName, PlatHotelName_En, Remark})
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
        let {ID, PlatformID, HotelID, PlatHotelID, PlatURL, PlatHotelName, PlatHotelName_En, Remark} = JSON.parse(config.data)
        _platforminfo.some(pi => {
            if (pi.ID === ID) {
                pi.PlatformID = PlatformID || pi.PlatformID
                pi.HotelID = HotelID || pi.HotelID
                pi.PlatHotelID = PlatHotelID || pi.PlatHotelID
                pi.PlatURL = PlatURL || pi.PlatURL
                pi.PlatHotelName = PlatHotelName || pi.PlatHotelName
                pi.PlatHotelName_En = PlatHotelName_En || pi.PlatHotelName_En
                pi.Ramark = Ramark || pi.Ramark
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
        _platforminfo = _platforminfo.filter(pi => pi.ID !== ID)
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
        mock.onGet('/Hotel/HotelPlatform/{id}').reply(API.detailsById)
        mock.onGet('/Hotel/HotelPlatform/hotel/{id}').reply(API.detailsByHotelid)
        mock.onGet('/Hotel/HotelPlatform//plat/{id}').reply(API.detailsByPlatid)
        mock.onGet('/Hotel/HotelPlatform/all').reply(API.listAll)
        mock.onPost('/Hotel/HotelPlatform/add').reply(API.add)
        mock.onPut('/Hotel/HotelPlatform/edit/{id}').reply(API.edit)
        mock.onPost('/Hotel/HotelPlatform/remove').reply(API.remove)
    }
}
