<template>
  <div class="app-container">
    <h2 style="text-align: center">
      发布新课程
    </h2>
    <el-steps
      :active="2"
      process-status="wait"
      finish-status="success"
      align-center
      style="margin-bottom: 20px"
    >
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-button
      type="text"
      @click="openChapterDialog"
    >
      添加章节
    </el-button>

    <ul class="chapterList">
      <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id"
      >
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button
              type="text"
              @click="openVideo(chapter.id)"
            >
              添加小节
            </el-button>
            <el-button
              type="text"
              @click="openEditChapter(chapter.id)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              @click="removeChapter(chapter.id)"
            >
              删除
            </el-button>
          </span>
        </p>
        <ul class="chapterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id"
          >
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button
                  type="text"
                  @click="openEditVideo(video.id)"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  @click="removeVideo(video.id)"
                >
                  删除
                </el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <el-form label-width="210px">
      <el-form-item>
        <el-button @click="previous">
          上一步
        </el-button>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="next"
        >
          下一步
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="dialogChapterFormVisible"
      title="添加章节"
    >
      <el-form
        :model="chapter"
        label-width="120px"
      >
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="saveOrUpdate"
          >
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVideoFormVisible"
      title="添加课时"
    >
      <el-form
        :model="video"
        label-width="120px"
      >
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio label="true">
              免费
            </el-radio>
            <el-radio label="false">
              默认
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/eduvod/video/uploadVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button
              size="small"
              type="primary"
            >
              上传视频
            </el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G, <br/>
                支持3GP、ASF、 AVI、DAT、DV、FLV、F4V、<br/>
                GIF、M2T、M4V、MJ2、MJPEG、 MKV、MOV、MP4、 <br/>
                MPE、MPG、MPEG、 MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、wMV、WEBM等视频格式上传
              </div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="saveOrUpdateVideo"
          >
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'

export default {
  name: "Chapter",
  data() {
    return {
      saveBtnDisabled: false,
      chapterVideoList: [],
      courseId: '',
      chapter: {
        title: '',
        sort: 0
      },
      video: {
        title: '',
        sort: 0,
        free: 0,
        videoSourceId: '',
        videoOriginName: ''
      },
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      fileList: [],
      BASE_API: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
    }
    this.getChapterVideo()
  },
  methods: {
    handleVodRemove() {
      video.deleteAliyunVideo(this.video.videoSourceId)
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除视频成功!'
          })
          this.fileList = []
          this.video.videoSourceId = ''
          this.video.videoOriginName = ''
        })
    },
    beforeVodRemove(file) {
      return this.$confirm(`确定移除 ${file.name} ?`)
    },
    handleVodUploadSuccess(response, file) {
      this.video.videoSourceId = response.data.videoId
      this.video.videoOriginName = file.name
    },
    handleUploadExceed() {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    removeVideo(videoId) {
      this.$confirm('此操作将永久删除小节信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        video.deleteVideo(videoId)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getChapterVideo()
          })
      })
    },
    openEditVideo(videoId) {
      video.getVideo(videoId)
        .then(response => {
          this.dialogVideoFormVisible = true
          this.video = response.data.video
        })
    },
    openVideo(chapterId) {
      this.dialogVideoFormVisible = true
      this.video.chapterId = chapterId
      this.video.title = ''
      this.video.videoSourceId = ''
      this.video.free = 0
      this.video.sort = 0
    },
    addVideo() {
      this.video.courseId = this.courseId
      video.addVideo(this.video)
        .then(() => {
          this.dialogVideoFormVisible = false
          this.$message({
            type: 'success',
            message: '添加小节成功!'
          })
          this.getChapterVideo()
        })
    },
    updateVideo() {
      video.updateVideo(this.video)
        .then(() => {
          this.dialogVideoFormVisible = false
          this.$message({
            type: 'success',
            message: '修改小节成功'
          })
          this.getChapterVideo()
        })
    },
    saveOrUpdateVideo() {
      console.log(this.video)
      console.log(this.video.id)
      if (!this.video.id) {
        this.addVideo()
      } else {
        this.updateVideo()
      }
    },
    removeChapter(chapterId) {
      this.$confirm('此操作将永久删除章节信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapter.deleteChapter(chapterId)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getChapterVideo()
          })
      })
    },
    openEditChapter(chapterId) {
      chapter.getChapter(chapterId)
        .then(response => {
          this.dialogChapterFormVisible = true
          this.chapter = response.data.chapter
        })
    },
    openChapterDialog() {
      this.dialogChapterFormVisible = true
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    addChapter() {
      this.chapter.courseId = this.courseId
      chapter.addChapter(this.chapter)
        .then(() => {
          this.dialogChapterFormVisible = false
          this.$message({
            type: 'success',
            message: '添加章节成功'
          })
          this.getChapterVideo()
        })
    },
    updateChapter() {
      chapter.updateChapter(this.chapter)
        .then(() => {
          this.dialogChapterFormVisible = false
          this.$message({
            type: 'success',
            message: '修改章节成功'
          })
          this.getChapterVideo()
        })
    },
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter()
      } else {
        this.updateChapter()
      }
    },
    getChapterVideo() {
      chapter.getAllChapterVideo(this.courseId)
        .then(response => {
          this.chapterVideoList = response.data.allChapterVideo
        })
    },
    previous() {
      this.$router.push({
        path: `/course/info/${this.courseId}`
      })
    },
    next() {
      this.$router.push({
        path: `/course/publish/${this.courseId}`
      })
    }
  }
}
</script>

<style scoped>
.chapterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chapterList li {
  position: relative;
}

.chapterList p {
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chapterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
