

import Mock from 'mockjs';
import {platform} from '../resources/platform';
let _platform = platform
const API = {
    list() {},
    listAll(config) {
        let {
            PlatName,
            id
        } = config.params
        let mockPlatform = _platform.filter(platforms => {
            if (PlatName && platforms.PlatName !== PlatName)
                return false
            if (id && platforms.id !== id)
                return false
            return true
        })
        return new Promise((resolve, reject) => {
            console.log('mockPlatform....' + mockPlatform)
            setTimeout(() => {
                let platform_list = JSON.parse(JSON.stringify(mockPlatform));
                resolve([
                    200, {
                        code: 200,
                        msg: '请求成功!!!',
                        platform_list
                    }
                ])
            }, 500)
        })

    },
    add(config) {
        console.log('config.data.....:::' + config.data)
        let {id, PlatName, Ramark} = JSON.parse(config.data)
        console.log('config.data222.....:::' + {PlatName, Ramark})
        _platform.push({id: Mock.Random.natural( 0, 100 ), PlatName, Ramark})
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
        let {id, PlatName, Ramark} = JSON.parse(config.data)
        _platform.some(p => {
            if (p.id === id) {
                p.PlatName = PlatName || p.PlatName
                p.Ramark = Ramark || p.Ramark
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
        let {id} = JSON.parse(config.data)
        _platform = _platform.filter(p => p.id !== id)
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
        mock.onGet('/Hotel/HotelThreePlatInfo/all').reply(API.listAll);
        mock.onGet('/Hotel/HotelThreePlatInfo').reply(API.list)
        mock.onPost('/Hotel/HotelThreePlatInfo/add').reply(API.add)
        mock.onPut('/Hotel/HotelThreePlatInfo/edit').reply(API.edit)
        mock.onPost('/Hotel/HotelThreePlatInfo/remove').reply(API.remove)
    }
}   

