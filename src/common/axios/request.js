import axios from "axios";
import api from "./api.js";

const commonFn = {
  stringify: function(obj, sep, eq) { // qs.stringify
    sep = sep || '&';
    eq = eq || '=';
    let str = "";
    for (var k in obj) {
      str += k + eq + unescape(obj[k]) + sep
    }
    return str.slice(0, -1)
  }
}

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = api.host;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // config.data = JSON.stringify(config.data);
      config.data = commonFn.stringify(config.data);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  error => {
    console.log(error);
  }
)

export default axios;
