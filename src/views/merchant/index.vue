<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        style="width: 100%"
        height="450"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="店铺地址" prop="address"></el-table-column>
        <el-table-column label="店铺介绍" prop="description"></el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag_box">
      <page :count="count" />
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :page-size="20"
        :pager-count="9"
        layout="prev, pager, next"
        :total="count"
      ></el-pagination>-->
    </div>
  </div>
</template>
<script>
import api from "@/api/getData.js";
import page from "@/components/page.vue";
export default {
  data() {
    return {
      tableData: [],
      limit: 20,
      offset: 0,
      count: 0,
      loading: true
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = await api.getMerchant(this.offset, this.limit);
      let count = await api.getMerCount();
      this.count = count;
      this.tableData = data;
      this.loading = false;
    },
    handleCurrentChange(val) {
      this.offset = val;
      this.initData();
    },
    handleAdd(index, val) {
      console.log(index, val);
      this.$router.push({ path: "/manage/addProduce", query: { id: val.id } });
    }
  },
  components: {
    page
  }
};
</script>
<style lang="scss" scoped>
.demo-table-expand .el-form-item {
  width: 50%;
  margin: 0;
}
.pag_box {
  margin-top: 20px;
}
</style>