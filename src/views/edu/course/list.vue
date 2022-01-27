<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="query.title" placeholder="课程名"/>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="query.status" placeholder="课程状态">
          <el-option label="已发布" value="Normal"/>
          <el-option label="未发布" value="Draft"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.lessonNum" placeholder="课时数"/>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="query.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="query.end"
          type="datetime"
          placeholder="选择截至时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template v-slot="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称"
        align="center"
      />
      <el-table-column
        label="状态"
        width="65"
        align="center"
      >
        <template
          v-slot="scope"
        >
          {{ scope.row.status === 'Normal' ? '已发布' : '未发布' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="lessonNum"
        label="课时数"
        width="70"
        align="center"
      />
      <el-table-column
        prop="buyCount"
        label="购买数量"
        width="90"
        align="center"
      />
      <el-table-column
        prop="viewCount"
        label="浏览数量"
        width="90"
        align="center"
      />
      <el-table-column
        prop="version"
        label="版本"
        width="70"
        align="center"
      />
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="160"
        align="center"
      />
      <el-table-column
        label="操作"
        width="480"
        align="center"
      >
        <template v-slot="scope">
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除课程信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
  name: 'List',
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      query: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      course.getListCourse(this.page, this.limit, this.query)
        .then(response => {
          this.list = response.data.list
          this.total = response.data.total
        })
    },
    resetData() {
      this.query = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.removeCourse(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList(this.page)
          })
      })
    }
  }
}
</script>

<style scoped>

</style>
