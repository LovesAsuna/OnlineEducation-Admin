import request from '@/utils/request'

export default {
  getTeacherListPage(current, limit, query) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'POST',
      data: query
    })
  },
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'DELETE'
    })
  },
  addTeacher(teacher) {
    return request({
      url: '/eduservice/teacher/addTeacher',
      method: 'POST',
      data: teacher
    })
  },
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'GET'
    })
  },
  updateTeacher(teacher) {
    return request({
      url: '/eduservice/teacher/updateTeacher',
      method: 'POST',
      data: teacher
    })
  }
}
