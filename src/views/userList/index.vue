<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        height="500"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="registe_time" label="注册日期"></el-table-column>
        <el-table-column prop="username" label="用户姓名"></el-table-column>
        <el-table-column prop="city" label="注册地址"></el-table-column>
      </el-table>
    </div>
    <div class="pag_box">
      <page :count="count" />
    </div>
  </div>
</template>
<script>
import page from "@/components/page.vue";
import axios from "@/api/getData.js";
export default {
  name: "userList",
  data() {
    return { tableData: [], count: 0, offset: 0, limit: 20, loading: true };
  },
  created() {
    console.log(2);
    this.initData();
    // console.log(process.env.NODE_ENV)
  },
  methods: {
    async initData() {
      const count = await axios.getUserCount;
      const data = await axios.getUserList(this.offset, this.limit);
      this.count = count;
      this.tableData = data;
      this.loading = false;
    },
    handleCurrentChange(val) {
      this.offset = val;
      this.initData();
    }
  },
  components: {
    page
  }
};
</script>
<style lang="scss">
.pag_box {
 
}
</style>