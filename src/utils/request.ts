/*
 * @Description: 封装统一axios请求
 * @Author: kejie 416965938@qq.com
 * @Date: 2022-11-28 11:45:50
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { localStorage } from './storage'
import useStore from '@/store'
// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      )
    }
    const { user } = useStore()

    if (user.token) {
      config.headers['bds2-token'] = localStorage.get('token')
    }
    return config
  },
  (err: any) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 成功
    if (res.code === 200) {
      return res
      // 登录失效
    } else {
      if (res.code === 4999) {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((_) => {
          const { user } = useStore()
          user.resetToken().then((_) => {
            location.reload()
          })
        })
      } else {
        ElMessage({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error: any) => {
    ElMessage({
      message: error.message || 'Error',
      type: 'error'
    })
    return Promise.reject(error.message)
  }
)

export default service
