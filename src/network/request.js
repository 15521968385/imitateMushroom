import axios from 'axios'
export function request(config) {

  const instance = axios.create({
    baseURL: 'http://192.168.10.6:2000'
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  // 响应拦截
  instance.interceptors.response.use(result => {
    return result.data
  }, err => {
    console.log(err);

  })
  // axios支持promise，instance时axios的实例，所以也支持promise
  return instance(config)

}