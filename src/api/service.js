import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'
import { API_PREFIX } from '../config'

axios.defaults.timeout = 10000
axios.defaults.baseURL = API_PREFIX

axios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const { status } = error.response

    switch (status) {
      case 401:
        Toast.fail('用户信息已过期，请重新登录')
        router.replace('/login').catch(() => {})
        return Promise.reject(error.response)
      default:
        return Promise.reject(error.response)
    }
  }
)

export default {
  get(url, params = {}) {
    return axios.get(url, { params })
  },
  post(url, params = {}) {
    return axios.post(url, params)
  },
  put(url, params = {}) {
    return axios.put(url, params)
  }
}
