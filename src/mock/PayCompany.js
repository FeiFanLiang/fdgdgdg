import Mock from 'mockjs';
import { List } from '../resources/PayCompany';
let _List = List;
const API = {
  getList() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, _List]);
      });
    });
  },
  getDetail(config) {
    let id = config.id;
    let data = {};
    for (let [, elem] of _List.entries()) {
      if (elem.ID === id) data = elem;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, data]);
      });
    });
  },
  addInfo(config) {
    let { ID, AccountName, AccountNum, Remark } = JSON.parse(config.data);
    _List.push({ ID: Mock.Random.guid(), AccountName, AccountNum, Remark });
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
    console.log(config);
    let id = JSON.parse(config.data).ID;
    for (let [, elem] of _List.entries()) {
      if (elem.ID === id) elem = JSON.parse(config.data);
    }
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
    _List = _List.filter(u => u.ID !== id);
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
    mock.onGet('/Hotel/PayCompany/All').reply(API.getList);
    mock.onGet('/Hotel/PayCompany/{id}').reply(API.getDetail);
    mock.onPost('/Hotel/PayCompany').reply(API.addInfo);
    mock.onPut('/Hotel/PayCompany/{id}').reply(API.editInfo);
    mock.onDelete('/Hotel/PayCompany/{id}').reply(API.delInfo);
  }
};
