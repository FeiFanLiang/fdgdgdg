const _maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

function _serialize(item) {
    return JSON.stringify(item);
}
function _deserialize(data) {
    return data && JSON.parse(data);
}

function _isStorageSupported(storage) {
    let supported = false;
    if (storage && storage.setItem) {
        supported = true;
        let key = '__' + Math.round(Math.random() * 1e7);
        try {
            storage.setItem(key, key);
            storage.removeItem(key);
        } catch (err) {
            supported = false;
        }
    }
    return supported;
}

function _getStorageInstance(storage) {
    let type = typeof storage;
    if (process.BROWSER && type === 'string' && window[storage] instanceof Storage) {
        return window[storage];
    }
    return storage;
}

function _isValidDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
}

function _getExpiresDate(expires, now) {
    now = now || new Date();

    if (typeof expires === 'number') {
        expires = expires === Infinity
            ? _maxExpireDate
            : new Date(now.getTime() + expires * 1000);
    } else if (typeof expires === 'string') {
        expires = new Date(expires);
    }

    if (expires && !_isValidDate(expires)) {
        throw new Error('`expires` parameter cannot be converted to a valid Date instance');
    }

    return expires;
}

function _isQuotaExceeded(e) {
    let quotaExceeded = false;
    if (e) {
        if (e.code) {
            switch (e.code) {
                case 22:
                    quotaExceeded = true;
                    break;
                case 1014:
                    // Firefox
                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if (e.number === -2147024882) {
            // Internet Explorer 8
            quotaExceeded = true;
        }
    }
    return quotaExceeded;
}

function _isCacheItem(item) {
    if (typeof item !== 'object') {
        return false;
    }
    if (item) {
        if ('c' in item && 'e' in item && 'v' in item) {
            return true;
        }
    }
    return false;
}

function _checkCacheItemIfEffective(cacheItem) {
    var timeNow = (new Date()).getTime();
    return timeNow < cacheItem.e;
}

function _checkAndWrapKeyAsString(key) {
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }
    return key;
}

const CacheAPI = {
    set(key, value, options) {},
    get(key) {},
    delete(key) {},
    deleteAllExpires() {},
    clear() {},
    add(key, options) {},
    replace(key, value, options) {},
    touch(key, exp) {}
};

class CacheItemConstructor {
    constructor(value, exp) {
        this.c = (new Date()).getTime();
        exp = exp || _maxExpireDate;
        var expires = _getExpiresDate(exp);
        this.e = expires.getTime();
        this.v = value;
    }

}
class CacheAPIImpl {
    set(key, val, options) {
        key = _checkAndWrapKeyAsString(key);

        options = Object.assign({}, options, {force: true});
        if (val === undefined) {
            return this.delete(key);
        }

        var value = _serialize(val);

        var cacheItem = new CacheItemConstructor(value, options.exp);
        try {
            this.storage.setItem(key, _serialize(cacheItem));
        } catch (e) {
            if (_isQuotaExceeded(e)) { // data wasn't successfully saved due to quota exceed so throw an error
                this.quotaExceedHandler(key, value, options, e);
            } else {
                console.error(e);
            }
        }

        return val;
    }
    get(key) {
        key = _checkAndWrapKeyAsString(key);
        var cacheItem = null;
        try {
            cacheItem = _deserialize(this.storage.getItem(key));
        } catch (e) {
            return null;
        }
        if (_isCacheItem(cacheItem)) {
            if (_checkCacheItemIfEffective(cacheItem)) {
                var value = cacheItem.v;
                return _deserialize(value);
            } else {
                this.delete(key);
            }
        }
        return null;
    }

    delete(key) {
        key = _checkAndWrapKeyAsString(key);
        this.storage.removeItem(key);
        return key;
    }

    deleteAllExpires() {
        var length = this.storage.length;
        var deleteKeys = [];
        var _this = this;
        for (var i = 0; i < length; i++) {
            var key = this.storage.key(i);
            var cacheItem = null;
            try {
                cacheItem = _deserialize(this.storage.getItem(key));
            } catch (e) {}

            if (cacheItem !== null && cacheItem.e !== undefined) {
                var timeNow = (new Date()).getTime();
                if (timeNow >= cacheItem.e) {
                    deleteKeys.push(key);
                }
            }
        }
        deleteKeys.forEach(function(key) {
            _this.delete(key);
        });
        return deleteKeys;
    }

    clear() {
        this.storage.clear();
    }

    add(key, value, options) {
        key = _checkAndWrapKeyAsString(key);
        Object.assign(options, {force: true});
        try {
            var cacheItem = _deserialize(this.storage.getItem(key));
            if (!_isCacheItem(cacheItem) || !_checkCacheItemIfEffective(cacheItem)) {
                this.set(key, value, options);
                return true;
            }
        } catch (e) {
            this.set(key, value, options);
            return true;
        }
        return false;
    }

    replace(key, value, options) {
        key = _checkAndWrapKeyAsString(key);
        var cacheItem = null;
        try {
            cacheItem = _deserialize(this.storage.getItem(key));
        } catch (e) {
            return false;
        }
        if (_isCacheItem(cacheItem)) {
            if (_checkCacheItemIfEffective(cacheItem)) {
                this.set(key, value, options);
                return true;
            } else {
                this.delete(key);
            }
        }
        return false;
    }

    touch(key, exp) {
        key = _checkAndWrapKeyAsString(key);
        var cacheItem = null;
        try {
            cacheItem = _deserialize(this.storage.getItem(key));
        } catch (e) {
            return false;
        }
        if (_isCacheItem(cacheItem)) {
            if (_checkCacheItemIfEffective(cacheItem)) {
                this.set(key, this.get(key), {exp: exp});
                return true;
            } else {
                this.delete(key);
            }
        }
        return false;
    }
}
export default class extends CacheAPIImpl {
    constructor(options) {
        super();
        // default options
        var defaults = {
            storage: 'localStorage',
            exp: Infinity // An expiration time, in seconds. default never .
        };

        var opt = Object.assign({}, defaults, options);

        var storage = _getStorageInstance(opt.storage);

        var isSupported = _isStorageSupported(storage);

        this.isSupported = function() {
            return isSupported;
        };

        if (isSupported) {
            this.storage = storage;

            this.quotaExceedHandler = function(key, val, options, e) {
                console.warn('Quota exceeded!');
                if (options && options.force === true) {
                    var deleteKeys = this.deleteAllExpires();
                    console.warn('delete all expires CacheItem : [' + deleteKeys + '] and try execute `set` method again!');
                    try {
                        options.force = false;
                        this.set(key, val, options);
                    } catch (err) {
                        console.warn(err);
                    }
                }
            };
        } else { // if not support, rewrite all functions without doing anything
            Object.assign(this, CacheAPI);
        }
    }
}
