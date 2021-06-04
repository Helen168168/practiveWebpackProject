import axios from "axios"

// let baseUrl = 'http://127.0.0.1:8080/a' //访问接口的地址

const objAxios = axios.create();
objAxios.defaults.timeout = 30000;

// 跨域请求，允许保存cookie
objAxios.defaults.withCredentials = true;

// HTTPrequest拦截
const requestInterceptors = config => {
    config.url = baseUrl + config.url;
    return config
}

// HTTPresponse拦截
const responseInterceptors = (res, reDataOnly) => {
    const status = Number(res.status) || 200;
    const message = res.data.message || errorCode[status] || errorCode['default'];
    //没有权限
    if (status === 401) {
     
      return Promise.reject(res)
    }
    //请求失败
    if (status !== 200 || (res.data && res.data.code === MSG_TYPE_FAIL)) {
      Message({
        message: message,
        type: 'error'
      });
      return Promise.reject(new Error(message))
    }
    return reDataOnly ? res.data : res
}