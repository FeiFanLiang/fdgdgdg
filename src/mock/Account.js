import Mock from 'mockjs';
import { LoginUsers } from '../resources/user';
const API = {
  login(config) {
    let { username, password } = JSON.parse(config.data);
    return new Promise((resolve, reject) => {
      let user = null;
      setTimeout(() => {
        let hasUser = LoginUsers.some(u => {
          if (u.username === username && u.password === password) {
            user = JSON.parse(JSON.stringify(u));
            user.password = undefined;
            return true;
          }
        });

        if (hasUser) {
          resolve([
            200,
            {
              code: 200,
              msg: '请求成功!!!',
              user
            }
          ]);
        } else {
          resolve([
            200,
            {
              code: 500,
              msg: '用户名或密码错误!!!'
            }
          ]);
        }
      }, Math.random() * 1000 + 1000);
    });
  },
  register(config) {
    let { username, password } = JSON.parse(config.data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let addUser = null;
        let checkUser = LoginUsers.find(function(value, index, arr) {
          return value.username === username;
        })
        if(!checkUser){
           addUser = LoginUsers.push({ id: Mock.Random.guid(), username, password, avatar: 'https://o0p2nwku4.qnssl.com/favicon.ico' });
        }
        if (addUser) {
          resolve([
            200,
            {
              code: 200,
              msg: '请求成功!!!',
            }
          ]);
        } else {
          resolve([
            200,
            {
              code: 500,
              msg: '注册失败!该用户已存在!!!'
            }
          ]);
        }
      }, Math.random() * 1000 + 1000);
    });
  }

};
export default {
  bootstrap(mock) {
    mock.onPost('/login').reply(API.login);
    mock.onPost('/register').reply(API.register);
  }
};
