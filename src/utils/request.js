import axios from 'axios'
import {serverIp} from "../../public/config";

const request = axios.create({
    baseURL: ``,  //公共接口 
    timeout: 5000
})

//请求拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
    if(user){
        config.headers['Authorization'] = user.token;  // 设置请求头
    }
    return config
}, error => {
    return Promise.reject(error)
});

// 响应拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        //当权限验证不通过的时候给出提示
        if(res.code === '401'){
          //alert(res.msg)
        }
        return res;
    },
    error => {



  /***** 接收到异常响应的处理开始 *****/
   if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        alert("服务器相应超时，请刷新页面重试");
      }
      else{
        error.message = '连接服务器失败';
      }
  
    }
    //alert(error.message);
   
        /***** 处理结束 *****/
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

