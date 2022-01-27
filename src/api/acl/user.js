import request from '@/utils/request'

const api_name = '/admin/acl/user'

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

  save(user) {
    return request({
      url: `${api_name}/save`,
      method: 'POST',
      data: user
    })
  },

  updateById(user) {
    return request({
      url: `${api_name}/update`,
      method: 'PUT',
      data: user
    })
  },
  GETAssign(userId){
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'GET'
    })
  },
  saveAssign(userId, roleId){
    return request({
      url: `${api_name}/doAssign`,
      method: 'POST',
      params:{userId, roleId}
    })
  },
  removeById(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'DELETE'
    })
  },
  removeRows(idList){
    return request({
      url: `${api_name}/batchRemove`,
      method: 'DELETE',
      data:idList
    })
  }
}
