import request from '@/utils/request'

export default {
  addVideo(video) {
    return request({
      url: '/eduservice/video/addVideo',
      method: 'POST',
      data: video
    })
  },
  getVideo(videoId) {
    return request({
      url: `/eduservice/video/getVideoInfo/${videoId}`,
      method: 'GET'
    })
  },
  updateVideo(video) {
    return request({
      url: '/eduservice/video/updateVideo',
      method: 'POST',
      data: video
    })
  },
  deleteVideo(videoId) {
    return request({
      url: `/eduservice/video/${videoId}`,
      method: 'DELETE'
    })
  },
  deleteAliyunVideo(videoId) {
    return request({
      url: `/eduvod/video/removeVideo/${videoId}`,
      method: 'DELETE'
    })
  }
}
