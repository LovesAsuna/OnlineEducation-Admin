import request from '@/utils/request'

const api_name = '/admin/acl/role'

export default {
  GETPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'GET',
      params: searchObj // url查询字符串或表单键值对
    })
  },
  GETById(id) {
    return request({
      url: `${api_name}/GET/${id}`,
      method: 'GET'
    })
  },

  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'POST',
      data: role
    })
  },

  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: 'PUT',
      data: role
    })
  },
  GETAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'GET'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'DELETE'
    })
  },
  removeRows(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'DELETE',
      data: idList
    })
  }

}
