<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option label="高级讲师" value="1"/>
          <el-option label="首席讲师" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item label="讲师头像">
        <pan-thumb :image="teacher.avatar"/>
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow=true"
        >
          更换头像
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API+'/eduoss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="saveBtnDisabled"
          @click="saveOrUpdate"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'Save',
  components: {
    ImageCropper,
    PanThumb
  },
  data() {
    return {
      teacher: {
        avatar: 'null'
      },
      saveBtnDisabled: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getInfo(id)
    } else {
      this.teacher = {
        avatar: 'null'
      }
    }
  },
  methods: {
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.close()
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    getInfo(id) {
      teacher.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    saveOrUpdate() {
      if (!this.teacher.id) {
        this.saveTeacher()
      } else {
        this.updateTeacher()
      }
    },
    updateTeacher() {
      teacher.updateTeacher(this.teacher)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({path: '/teacher/table'})
        })
    },
    saveTeacher() {
      teacher.addTeacher(this.teacher)
        .then(() => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({path: '/teacher/table'})
        })
    }
  }
}
</script>

<style scoped>

</style>
