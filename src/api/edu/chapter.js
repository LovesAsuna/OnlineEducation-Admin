import request from '@/utils/request'

export default {
  getAllChapterVideo(courseId) {
    return request({
      url: `/eduservice/chapter/getChapterVideo/${courseId}`,
      method: 'GET'
    })
  },
  addChapter(chapter) {
    return request({
      url: '/eduservice/chapter/addChapter',
      method: 'POST',
      data: chapter
    })
  },
  getChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/getChapterInfo/${chapterId}`,
      method: 'GET'
    })
  },
  updateChapter(chapter) {
    return request({
      url: '/eduservice/chapter/updateChapter',
      method: 'POST',
      data: chapter
    })
  },
  deleteChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/${chapterId}`,
      method: 'DELETE'
    })
  },
}
