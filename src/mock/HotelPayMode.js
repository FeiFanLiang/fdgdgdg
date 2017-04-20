import Mock from 'mockjs'
import {HotelPayMode} from '../resources/HotelPayMode'
let _HotelPayMode = HotelPayMode
const API = {
  getList(config) {
    //console.log(config)
    let {
        page,
        sortWay,
        ModeName,
        Remark
    } = config.params
    let mockList = _HotelPayMode.filter(user => {
        if (ModeName && user.ModeName !== ModeName)
            return false
        if (Remark && user.Remark !== Remark)
            return false
        return true
    })
    if (sortWay) {
        let {order, prop} = sortWay
        mockList = mockList.sort((u1, u2) => order === 'ascending'
            ? u1[prop] - u2[prop]
            : u2[prop] - u1[prop])
    }
    if (page === 0)
        page++
    mockList = mockList.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
            total: _HotelPayMode.length,
            list: mockList
        }]);
      });
    });
  },
  getDetail(config) {
    let id = config.id;
    let data = {};
    for (let [, elem] of _HotelPayMode.entries()) {
      if (elem.ID === id) data = elem;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, data]);
      });
    });
  },
  addInfo(config) {
    let { ID, ModeName, Remark } = JSON.parse(config.data);
    _HotelPayMode.push({ ID: Mock.Random.guid(), ModeName, Remark });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200,
          {
            code: 200,
            msg: '添加成功'
          }
        ]);
      });
    });
  },
  editInfo(config) {
    let {ID, ModeName, Remark} = JSON.parse(config.data)
    _HotelPayMode.some(u => {
        if (u.ID === ID) {
            u.ModeName = ModeName || u.ModeName
            u.Remark = Remark || u.Remark
            return true
        }
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200,
          {
            code: 200,
            msg: '编辑成功'
          }
        ]);
      });
    });
  },
  delInfo(config) {
    let id = config.id;
    _HotelPayMode = _HotelPayMode.filter(u => u.ID !== id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200,
          {
            code: 200,
            msg: '删除成功'
          }
        ]);
      });
    });
  }
};
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelPayMode/All').reply(API.getList)
        mock.onGet('/Hotel/HotelPayMode/{id}').reply(API.getDetail)
        mock.onPost('/Hotel/HotelPayMode').reply(API.addInfo)
        mock.onPut('/Hotel/HotelPayMode/{id}').reply(API.editInfo)
        mock.onDelete('/Hotel/HotelPayMode/{id}').reply(API.delInfo)
    }
}
