import request from '@/utils/request'

export default {
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/addCourseInfo',
      method: 'POST',
      data: courseInfo
    })
  },
  getListTeacher() {
    return request({
      url: '/eduservice/teacher/findAll',
      method: 'GET'
    })
  },
  getCourseInfoById(id) {
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'GET'
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/updateCourseInfo',
      method: 'POST',
      data: courseInfo
    })
  },
  getPublishCourseInfo(id) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${id}`,
      method: 'GET'
    })
  },
  publishCourse(id) {
    return request({
      url: `/eduservice/course/publishCourse/${id}`,
      method: 'POST'
    })
  },
  getListCourse(current, limit, query) {
    return request({
      url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
      method: 'POST',
      data: query
    })
  },
  removeCourse(id) {
    return request({
      url: `/eduservice/course/${id}`,
      method: 'DELETE'
    })
  }
}
