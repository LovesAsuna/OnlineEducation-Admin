<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="BASE_API + 'eduservice/subject/addSubject'"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :limit="1"
          :disabled="importBtnDisabled"
          :auto-upload="false"
          name="file"
          accept=".xlsx"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >
            选取文件
          </el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >
            上传到服务器
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Save",
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      importBtnDisabled: false,
      loading: false
    }
  },
  create() {

  },
  methods: {
    submitUpload() {
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },
    fileUploadSuccess() {
      this.loading = false
      this.$message({
        type: 'success',
        message: '添加课程分类成功'
      })
      this.$router.push({path: '/subject/list'})
    },
    fileUploadError() {
      this.loading = false
      this.$message({
        type: 'error',
        message: '导入失败'
      })
    }
  }

}
</script>

<style scoped>

</style>
