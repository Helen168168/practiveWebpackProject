import axios from 'axios'
import router from "@/router/router"
import { Message } from 'element-ui'

const env = process.env;
let baseUrl = env.VUE_APP_URL + '/a';

const objAxios = axios.create();
objAxios.defaults.timeout = 30000;

// 跨域请求，允许保存cookie
objAxios.defaults.withCredentials = true;
//获取HTTP的响应状态码是 resolve(true) 还是reject(false)
objAxios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300 
}

//HTTPrequest拦截
const requestInterceptors = config => {
  config.url = baseUrl;
  const isExitToken = (config.headers || {}).isExitToken === false;
  let token = store.getters.access_token;
  if (token && !isExitToken) {
    config.headers['Authorization'] = token;
  }
  return config
}

//HTTPresponse拦截
const responseInterceptors = (res, reDataOnly) => {
  const status = ~~res.status || 200;
  const message = res.data.message || errorCode[status] || errorCode['default'];
  //401表示没有权限
  if (status === 401) {
    let route = router.history.current
    if(route.path !== '/login') {
      store.dispatch('fedLogOut').then(() => {
        store.commit('SET_REDIRECT', {path: route.fullPath, query: route.query})
        router.push({path: '/login'})
      });
      Message({
        message: message,
        type: 'error'
      });
    }
    return Promise.reject(res)
  }
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    });
    return Promise.reject(new Error(message))
  }
  if (status === 200) {
    Message({
      message: res.data.message,
      type: 'success'
    })
  }
  return reDataOnly ? res.data : res
}

objAxios.interceptors.request.use(requestInterceptors, error => {
  return Promise.reject(error)
});

objAxios.interceptors.response.use( res => responseInterceptors(res, true), error => {
  return Promise.reject(new Error(error))
});

export default objAxios
