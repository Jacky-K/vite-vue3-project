import request from '@/utils/request'

export function login(data: object) {
  return request({
    url: '/api/sys-user/auth/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/api/sys-user/getUser',
    method: 'get'
  })
}

export function getUserMenu() {
  return request({
    url: '/api/sys-auth/getUserAuthList',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/sys-user/auth/logout',
    method: 'post'
  })
}
