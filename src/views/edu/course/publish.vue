<template>
  <div class="app-container">
    <h2 style="text-align: center">
      发布新课程
    </h2>
    <el-steps
      :active="3"
      process-status="wait"
      finish-status="success"
      align-center
      style="margin-bottom: 20px"
    >
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
        <p><span>所属分类: {{ coursePublish.subjectLevelOne }} - {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>课程讲师: {{ coursePublish.teacherName }}</p>
        <h3 class="red">${{ coursePublish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">
        返回修改
      </el-button>
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="publish"
      >
        发布课程
      </el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
  name: "Publish",
  data() {
    return {
      saveBtnDisabled: false,
      courseId: '',
      coursePublish: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCoursePublishId()
    }
  },
  methods: {
    getCoursePublishId() {
      course.getPublishCourseInfo(this.courseId)
        .then(response => {
          this.coursePublish = response.data.publishCourse
        })
    },
    previous() {
      this.$router.push({
        path: `/course/chapter/${this.courseId}`
      })
    },
    publish() {
      course.publishCourse(this.courseId)
      .then(() => {
        this.$message({
          type: 'success',
          message: '课程发布成功'
        })
      })
      this.$router.push({
        path: '/course/list'
      })
    }
  }
}
</script>

<style scoped>

</style>
