import Mock from 'mockjs';
import { orderList } from '../resources/Order';
let _orderList = orderList;
const API = {
  getList(config) {
		console.log(config)
    let {
        page,
        sortWay,
        AccountName,
        AccountNum
    } = config.params
    let mockList = _orderList.filter(user => {
        if (AccountName && user.AccountName !== AccountName)
            return false
        if (AccountNum && user.AccountNum !== AccountNum)
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
            total: _orderList.length,
            list: mockList
        }]);
      });
    });
  },
  getDetail(config) {
    let id = config.id;
    let data = {};
    for (let [, elem] of _orderList.entries()) {
      if (elem.ID === id) data = elem;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, data]);
      });
    });
  },
  editInfo(config) {
    let {ID, AccountName, AccountNum, Remark} = JSON.parse(config.data)
    _orderList.some(u => {
        if (u.ID === ID) {
            u.AccountName = AccountName || u.AccountName
            u.AccountNum = AccountNum || u.AccountNum
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
};
export default {
  bootstrap(mock) {
    mock.onGet('/Hotel/Order/All').reply(API.getList);
    mock.onGet('/Hotel/Order/{id}').reply(API.getDetail);
    mock.onPut('/Hotel/Order/{id}').reply(API.editInfo);
  }
};
