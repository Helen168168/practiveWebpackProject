/**
* 动态插入css
* @param url
*/
export const loadStyle = (url) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link)
}

/**
* 获取对象的类型
* @param obj
* @returns {string|*}
*/
export const getObjType = (obj) => {
    let toString = Object.prototype.toString;
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
},

/**
* 对象深拷贝
*/
export const deepClone = (data) => {
    let type = this.getObjType(data);
    let obj;
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        return data
    }
    if (type === 'array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(this.deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (let key in data) {
            obj[key] = this.deepClone(data[key])
        }
    }
    return obj
},