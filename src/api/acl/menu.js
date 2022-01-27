import request from '@/utils/request'

const api_name = '/admin/acl/permission'

export default {
  GETNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'GET'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "delete"
    })
  },
  saveLevelOne(menu) {
    return request({
      url: `${api_name}/save`,
      method: "POST",
      data: menu
    })
  },
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: "PUT",
      data: menu
    })
  },
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'GET'
    })
  },
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: "POST",
      params: {roleId, permissionId}
    })
  }
}
