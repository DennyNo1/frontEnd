/* 封装axios用于发送请求 */
import axios from 'axios'
import { Toast } from 'vant';
import store from '@/store/index'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',//这个地址就是为了获取这个项目的数据。在后面加东西，就能获取到。
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么


  const token = store.state.user.userInfo.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  //在任何请求发送前跳出loading
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration:0
  });

  


  return config
}, 
function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})







// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 1.对非200的响应，提示错误信息。实际上就是简化各个组件中methods的对于错误响应的流程。比如login后，可以将验证码错，图形码错的逻辑写在这里就。我这里懒得把login的逻辑移动到这里。
  // 2.关闭loading
  Toast.clear()
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
//为了别的文件能导入
export default request