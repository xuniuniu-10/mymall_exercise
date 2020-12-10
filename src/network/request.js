import axios from 'axios'

export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })
  // 拦截器(如果config中的内容不符合服务器要求，经过调整后再发出【一些请求必须要是是登录状态】)
  // instance.interceptors.request.use(config => {
  //   return config
  // },err => {
  //   // console.log(err)
  // })
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  // 发送真正的网络请求
  return instance(config)
   
}
