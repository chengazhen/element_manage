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
        height="450"
      >
        <el-table-column label="序号" type="index" width="180"></el-table-column>
        <el-table-column prop="user_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="create_time" label="注册日期" width="180"></el-table-column>
        <el-table-column prop="city" label="地址"></el-table-column>
        <el-table-column prop="admin" label="权限"></el-table-column>
      </el-table>
    </div>
    <div class="pag_box">
      <page :count="count" />
    </div>
  </div>
</template>
<script>
import page from "@/components/page.vue";
import api from "@/api/getData.js";
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      limit: 20,
      offset: 0,
      loading: true
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const count = await api.getAdminCount();
      const list = await api.getAdminList(this.offset, this.limit);
      this.tableData = list;
      this.count = count;
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