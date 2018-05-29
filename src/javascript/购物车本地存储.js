/**
 * @decription 本地缓存方法封装(storage，cookie后期添加)
 * return 返回一个option对象，暴露修改 删除，获取等方法
 * set: 保存缓存
 * get: 获取数据
 * rm: 删除数据
 */
function addCard () {
        var opt = {//对外暴露操作方法对象
                /**
                 * @description 获取数据，默认传入需要获取值得key，不传再返回data对象(全部数据)
                 * @param  {string} key 需要获取值得key
                 * @return {string|object}    得到的数据|整个数据对象data
                 */
                get: function (key) {
                        if (key) return data[key]
                        return data
                    },
                /**
                 * @description 保存数据
                 * @param {string|array} key   如果是保存一个值的话传入string作为value的key，key = 'key'
                 *                             如果是key是数组的话，里边保存的是对象[{"key": "vallue"}]
                 * @param {string} value 需要保存的数据，key是一个数组的时候，value值不用传
                 * @return {Boolean} 如果添加成功返回true,如果已经有数据或者添加失败，则返回false
                 */
                set: function (key, value, duration) {
                    var write  = false;
                        duration = duration  || 2592000000 //30天的毫秒数
                        console.log('duration', duration)
                    //判断key 如果是一个string 并且value不为空的话则进行缓存
                    if (typeof key == 'string' && !!value) {
                        data[key] = value
                        write = true
                    }
                    // 假如key是一个array的话，进行遍历处理
                    else if (Object.prototype.toString.call(key) == '[object Array]'){
                        Object.keys(key).forEach(function (item) {
                            if(!data.hasOwnProperty(key) && key[item]) {
                               data[item] = key[item]
                               if(!write)  write = true
                            }

                        })
                    }
                    storage.setStorage(_key, JSON.stringify(data), duration)
                    return write
                },
                /**
                 * @decription 删除数据函数，默认传入需要删除数据的key，不传则则默认删除全部
                 * @param  {string} key 需要删除数据的key
                 * @return {object}     更新后的数据对象
                 */
                rm: function (key) {
                    if (key) delete data[key]
                    else data = {}
                    storage.setStorage(_key, JSON.stringify(data))
                    return data
                }
            },
        storage = {
            /**
             对本地数据进行操作的相关方法，如localStorage,sessionStorage的封装
            */
            setStorage: function(key, value, duration) {
                var data = {
                    value: value,
                    expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
                };
                localStorage[key] = JSON.stringify(data);
            },
            getStorage: function(key) {
                var data = localStorage[key];
                if (!data || data === "null") {
                    return null;
                }
                var now = this.getCurrentTimeStamp();
                var obj;
                try {
                    obj = JSON.parse(data);
                } catch (e) {
                    return null;
                }
                if (obj.expiryTime === 0 || obj.expiryTime > now) {
                    return obj.value;
                }
                return null;
            },
            removeStorage: function(key){
                localStorage.removeItem(key);
            },
            getSession: function(key) {
                var data = sessionStorage[key];
                if (!data || data === "null") {
                    return null;
                }
                return JSON.parse(data).value;

            },
            setSession: function(key, value) {
                var data = {
                    value: value
                }
                sessionStorage[key] = JSON.stringify(data);
            },
            getCurrentTimeStamp: function() {
                return Date.parse(new Date());
            }
        },
        _key = 'addCard', //storage保存数据的key之
        data = JSON.parse(storage.getStorage(_key)) || {}; //保存购物车数据;

        return opt
}
var card =  addCard()
