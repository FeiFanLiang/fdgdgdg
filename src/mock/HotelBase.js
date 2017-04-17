import Mock from 'mockjs'
import {hotelbase} from '../resources/hotelbase';
let _hotelbase = hotelbase

const API = {
    listAll(config) {
        let {
            id, HotelName, HotelName_En,
            page
        } = config.params
        let mockHotelbase = _hotelbase.filter( hotelbases => {
            if (HotelName && hotelbases.HotelName !== HotelName)
                return false
            if (HotelName_En && hotelbases.HotelName_En !== HotelName_En)
                return false
            if (id && hotelbases.id !== id)
                return false
            return true
        })
        if (page === 0)
            page++
        mockHotelbase = mockHotelbase.filter((h, index) => index < 10 * page && index >= 10 * (page - 1))
        return new Promise((resolve, reject) => {
            // console.log('hotelbase....' + hotelbase)
            setTimeout(() => {
                let hotelbase_list = JSON.parse(JSON.stringify(mockHotelbase));
                // console.log('hotelbase11111....' + hotelbase_list)
                resolve([
                    200, {
                        code: 200,
                        msg: '请求成功!!!',
                        hotelbase_list
                    }
                ])
            }, 500)
            console.log('wwwwwwwww....')
        })

    },
    listByQuery(config) {
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
    listDefault(config) {
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
    detailsById(config) {
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
    detailsByHotelNum(config) {
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
    add(config) {
        console.log('config.datahotelbaseadd:' + config.data)
        let {form} = JSON.parse(config.data)
        console.log('config.data222.....:::' + {form})
        _hotelbase.push({form})
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
    remove(config) {
        let {id} = JSON.parse(config.data)
        _hotelbase = _hotelbase.filter(p => p.id !== id)
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
    },
    edit(config) {
        let {id, HotelName, HotelName_En, FrontPhone, Address, Star, PersonName, PurchasingName, PayMode} = JSON.parse(config.data)
        _hotelbase.some(pb => {
            if (pb.id === id) {
                pb.HotelName = HotelName || pb.HotelName
                pb.HotelName_En = HotelName_En || pb.HotelName_En
                pb.FrontPhone = FrontPhone || pb.FrontPhone
                pb.Address = Address || pb.Address
                pb.Star = Star || pb.Star
                pb.PersonName = PersonName || pb.PersonName
                pb.PurchasingName = PurchasingName || pb.PurchasingName
                pb.PayMode = PayMode || pb.PayMode
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
    }
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelBase/All').reply(API.listAll)
        mock.onGet('/Hotel/HotelBase').reply(API.listByQuery)
        mock.onGet('/Hotel/HotelBase/default').reply(API.listDefault)
        mock.onGet('/Hotel/HotelBase/{id}').reply(API.detailsById)
        mock.onGet('/Hotel/HotelBase/HotelNum/{id}').reply(API.detailsByHotelNum)
        mock.onPost('/Hotel/HotelBase/add').reply(API.add)
        mock.onPost('/Hotel/HotelBase/remove/{id}').reply(API.remove)
        mock.onPut('/Hotel/HotelBase/edit/{id}').reply(API.edit)
    }
}
