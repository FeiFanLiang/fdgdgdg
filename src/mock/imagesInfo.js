import Mock from 'mockjs'
import {imagesInfo} from '../resources/imagesInfo';
let _imagesInfo = imagesInfo

const API = {
    listAll(config) {
        let {
            hotelName,
            date1, date2,
            page
        } = config.params
        let mockImagesInfo  = _imagesInfo.filter(imagesInfos => {
            if (hotelName && imagesInfos.hotelName !== hotelName)
                return false
            if (date1 && imagesInfos.date1 !== date1)
                return false
            if (date1 && imagesInfos.date2 !== date2)
                return false
            return true
        })
        if (page === 0)
            page++
        mockImagesInfo = mockImagesInfo.filter((h, index) => index < 10 * page && index >= 10 * (page - 1))
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let imagesInfo_list = JSON.parse(JSON.stringify(mockImagesInfo));
                resolve([
                    200, {
                        code: 200,
                        msg: '请求成功!!!',
                        imagesInfo_list
                    }
                ])
            }, 500)
        })

    },
    add() {},
    edit(config) {
        let {id, hotelName, upPersonName} = JSON.parse(config.data)
        _imagesInfo.some(img => {
            if (img.id === id) {
                img.hotelName = hotelName || img.hotelName
                img.upPersonName = upPersonName || img.upPersonName
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
        _imagesInfo = _imagesInfo.filter(img => img.id !== id)
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
        mock.onGet('/images/imagesInfo/all').reply(API.listAll)
        mock.onPost('/images/imagesInfo/add').reply(API.add)
        mock.onPut('/images/imagesInfo/edit/{id}').reply(API.edit)
        mock.onPost('/images/imagesInfo/remove/{id}').reply(API.remove)
    }
}
