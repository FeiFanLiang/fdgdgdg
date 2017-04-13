
import Mock from 'mockjs';
import {platform} from '../resources/platform';
/*const API = {
    list() {},
    details() {},
    add() {},
    edit() {},
    remove() {}
}
export default {
    bootstrap(mock) {
        let mock = new MockAdapter(axios);
        mock.onGet('/Values').reply(API.list);
        mock.onGet('/Values/{id}').reply(API.details);
        mock.onPost('/Values').reply(API.add);
        mock.onPut('/Values/{id}').reply(API.edit);
        mock.onPost('/Values/{id}').reply(API.remove);
    }
}*/

const API = {
    listAll(config) {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let platform_list = JSON.parse(JSON.stringify(platform));
                    resolve([
                        200, {
                            code: 200,
                            msg: '请求成功!!!',
                            platform_list
                        }
                    ]);
                }, Math.random() * 200 + 50);
            });
    }
}
export default {
    bootstrap(mock) {
        mock.onGet('/platform').reply(API.listAll);
    }
}