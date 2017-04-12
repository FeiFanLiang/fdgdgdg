import WebStorageCache from '../libs/web-storage-cache';

//  判断是否登录
const isLogin = () => {
    const token = WebStorageInstance.get('token');
    if (token) {
        return true;
    }
    return false;
    // return localStorage.loginname || '';
};

// 检查是否支持webp格式图片
const checkWebp = () => {
    if (!process.BROWSER) {
        return;
    }
    try {
        return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);
    } catch (err) {
        return false;
    }
};
// WebStorageCache实例
const WebStorageInstance = new WebStorageCache();
// 检查是否已经已经缓存
const checkWebStorage = (cacheName) => {
    const cacheNameList = WebStorageInstance.get(cacheName);
    if (cacheNameList) {
        return true;
    }
    return false;
};
// 检查是否缓存并返回promise
const storageCachePromise = (cacheName) => {
    const promise = new Promise((resolve, reject) => {
        const cacheNameList = WebStorageInstance.get(cacheName);
        if (cacheNameList) {
            resolve(cacheNameList);
        } else {
            reject(null);
        }
    });
    return promise;
};
// 设置本地存储
const setCachePromise = (cacheName, data) => {
    const promise = new Promise((resolve, reject) => {
        if (WebStorageInstance.set(cacheName, data)) {
            resolve('ok');
        } else {
            reject(null);
        }
    });
    return promise;
};
// 将获取到的列表数组转成对象形式
const listToObject = (list,identifier) => {
    if (!list || !Array.isArray(list))
        return;
    let obj = {};
    list.map((item) => {
        obj[item[identifier]] = item;
    });
    return obj;
}
exports.isLogin = isLogin;
exports.checkWebp = checkWebp;
exports.WebStorageInstance = WebStorageInstance;
exports.checkWebStorage = checkWebStorage;
exports.setCachePromise = setCachePromise;
exports.storageCachePromise = storageCachePromise;
exports.listToObject = listToObject;
