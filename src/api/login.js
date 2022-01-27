import request from '@/utils/request'

// 登录
export function login(username, password) {
  // debugger
  return request({
    url: '/admin/acl/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

// 获取用户信息
export function GETInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'GET',
    params: {token}
  })
}

// 登出
export function logout() {
  //debugger
  return request({
    url: '/admin/acl/index/logout',
    method: 'POST'
  })
}

// 获取菜单权限数据
export function GETMenu() {
  return request({
    url: '/admin/acl/index/menu',
    method: 'GET'
  })
}
