import Mock from 'mockjs';

const API = {
    listAll(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    },
    listByQuery(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    },
    listDefault(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    },
    detailsById(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    },
    detailsByHotelNum(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    },
    add(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    },
    remove(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    },
    edit(config) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    200, {
                        code: 200,
                        msg: '添加成功'
                    }
                ]);
            });
        });
    }
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelBase/All').reply(API.listAll);
        mock.onGet('/Hotel/HotelBase').reply(API.listByQuery);
        mock.onGet('/Hotel/HotelBase/default').reply(API.listDefault);
        mock.onGet('/Hotel/HotelBase/{id}').reply(API.detailsById);
        mock.onGet('/Hotel/HotelBase/HotelNum/{id}').reply(API.detailsByHotelNum);
        mock.onPost('/Hotel/HotelBase').reply(API.add);
        mock.onPost('/Hotel/HotelBase/{id}').reply(API.remove);
        mock.onPut('/Hotel/HotelBase/{id}').reply(API.edit);
    }
}
