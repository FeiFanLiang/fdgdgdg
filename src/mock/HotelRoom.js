import Mock from 'mockjs'
import {hotelroomlist} from '../resources/hotelroomlist';
let _hotelroomlist = hotelroomlist

const API = {
    detailsById() {},
    detailsByPid() {},
    listAll(config) {
      let {
            id
        } = config.params
        let mockHotelroomlist = _hotelroomlist.filter(hotelroomlists => {
            if (id && hotelroomlists.id !== id)
                return false
            return true
        })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let hotelroomlist_list = JSON.parse(JSON.stringify(mockHotelroomlist));
                resolve([
                    200, {
                        code: 200,
                        msg: '请求成功!!!',
                        hotelroomlist_list
                    }
                ])
            }, 500)
        })
    },
    add(config) {
        let {id, RoomName, Beds, RoomCount, Remark, IsDelete} = JSON.parse(config.data)
        _hotelroomlist.push({id: Mock.Random.natural( 0, 100 ), RoomName, Beds, RoomCount, Remark, IsDelete})
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
        let {id, RoomName, Beds, RoomCount, Remark, IsDelete} = JSON.parse(config.data)
        _hotelroomlist.some(pi => {
            if (pi.id === id) {
                pi.RoomName = RoomName || pi.RoomName
                pi.Beds = Beds || pi.Beds
                pi.RoomCount = RoomCount || pi.RoomCount
                pi.Remark = Remark || pi.Remark
                pi.IsDelete = IsDelete || pi.IsDelete
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
        _hotelroomlist = _hotelroomlist.filter(pi => pi.id !== id)
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
        mock.onGet('/Hotel/HotelRoom/{id}').reply(API.detailsById)
        mock.onGet('/Hotel/HotelRoom/Pid/{id}').reply(API.detailsByPid)
        mock.onGet('/Hotel/HotelRoom/all').reply(API.listAll)
        mock.onPost('/Hotel/HotelRoom/add').reply(API.add)
        mock.onPut('/Hotel/HotelRoom/edit/{id}').reply(API.edit)
        mock.onPost('/Hotel/HotelRoom/remove/{id}').reply(API.remove)
    }
}
