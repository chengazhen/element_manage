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
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.restaurant_id}}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category_id }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.tips }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="120"></el-table-column>
        <el-table-column label="食品名称" prop="name"></el-table-column>
        <el-table-column label="食品介绍" prop="description"></el-table-column>
        <el-table-column label="评分" prop="rating"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div></div>
  </div>
</template>
<script>
import api from "@/api/getData.js";
export default {
  data() {
    return {
      limit: 20,
      offset: 0,
      tableData: [],
      loading:true
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const data = await api.getFoodList(this.offset, this.limit);
      const count = await api.getFoodCount();
      this.tableData = data;
      this.loading=false;
      console.log(data, count, 2);
    },
    handleEdit() {},
    handleDelete() {}
  }
};
</script>
<style lang="scss">
.el-form--inline .el-form-item {
  width: 50%;
  margin-right: 0;
}
</style>