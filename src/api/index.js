import service from './service'

export default {
  getVerificationCode(params) {
    return service.post('/send', params)
  },
  login(params) {
    return service.post('/login', params)
  },
  getUserInfo() {
    return service.get('/user')
  },
  getUserTemperatures(params) {
    return service.post('/list', params)
  }
}
