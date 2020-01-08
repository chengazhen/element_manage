<template>
  <div>
    <!-- //表单弹框 -->

    <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
      <el-form :model="openData">
        <el-form-item label="食品名称" :label-width="formLabelWidth">
          <el-input v-model="openData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍" :label-width="formLabelWidth">
          <el-input v-model="openData.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品分类" :label-width="formLabelWidth">
          <el-select v-model="openData.category_name" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-table :data="openData.specfoods" style="width: 100%">
            <el-table-column prop="specs_name" label="规格"></el-table-column>
            <el-table-column prop="packing_fee" label="包装费"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="maskHandleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/food"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="openData.image_path" :src="imgBaseUrl+openData.image_path" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterEdit()">确 定</el-button>
      </div>
    </el-dialog>

    <div>
      <el-table
        @expand-change="open"
        :row-key="row=>row.item_id"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        style="width: 100%"
        height="450"
      >
        <!-- //显示得数据 -->
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
                <span>{{ props.row.category_name }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="120"></el-table-column>
        <el-table-column label="食品名称" prop="name"></el-table-column>
        <el-table-column label="食品介绍" prop="description"></el-table-column>
        <el-table-column label="评分" prop="rating"></el-table-column>
        <!-- <el-col :span="4"> -->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- </el-col> -->
      </el-table>
    </div>
    <div>
      <page :count="count" />
    </div>
  </div>
</template>
<script>
import api from "@/api/getData.js";
import page from "@/components/page.vue";
import { imgBaseUrl } from "@/api/getData.js";
export default {
  name: "foodList",
  data() {
    return {
      limit: 20,
      offset: 0,
      tableData: [],
      openData: {}, //打开收缩板展示得数据
      loading: true,
      count: 0,
      limit: 20,
      offset: 0,
      dialogFormVisible: false,
      form: {},
      expandRow: [],
      formLabelWidth: "80px",
      imgBaseUrl, //预览图片的基地址,
      options: [],
      specfoods: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    open(row, status) {
      this.initTableData(row, status, "open");
    },
    // 编辑食品
    enterEdit() {
      let arr = [];
      this.openData["new_category_id"] = this.openData.category_id;
      this.openData.specfoods.forEach(item => {
        arr.push({
          specs: item.specs_name,
          packing_fee: item.packing_fee,
          price: item.price
        });
      });
      this.openData["specs"] = arr;
      api
        .upDataGoods(this.openData)
        .then(res => {
          console.log(res);
          if (res.data.status === 1) {
            this.$message.success("修改成功");
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch(res => {
          console.log(res);
        });
      this.dialogFormVisible = false;
      // this.dialogFormVisible = false;
      // this.initTableData();
    },
    async initTableData(row, status, who) {
      let categoryData = {};
      const index = row.index;
      if (status.length > 0) {
        const index = row.index;
        let tableData = this.tableData[index];
        console.log(row, Boolean(status.length > 0));
        // console.log();
        let data = await api.getGoodsDetail(row.category_id);
        console.log(data);
        categoryData = {
          category_name: data.data.name,
          description: data.data.description
        };
        const shopDetail = await api.getShopDetail(row.restaurant_id);
        this.openData = {
          ...row,
          ...categoryData,
          ...{ address: shopDetail.data.address, shop: shopDetail.data.name }
        };
        console.log(this.openData);
        console.log(who === "eidt");
        if (who === "edit") {
          let sort = await api.getProduceSort(row.restaurant_id);
          console.log("sort===>", sort);
          sort.data.category_list.forEach((item, index) => {
            this.options.push({ value: item.name, label: item.name });
          });
          console.log(this.category_list);
        } else {
          console.log("isedit");
          this.tableData.splice(index, 1, this.openData);
        }
      }
    },
    async initData() {
      this.tableData = [];
      const data = await api.getFoodList(this.offset, this.limit);
      const count = await api.getFoodCount();
      //初始化展示数据
      data.forEach((item, index) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.item_id = item.item_id;
        tableData.rating = item.rating;
        tableData.month_sales = item.month_sales;
        tableData.restaurant_id = item.restaurant_id;
        tableData.category_id = item.category_id;
        tableData.image_path = item.image_path;
        tableData.specfoods = item.specfoods;
        tableData.index = index;
        this.tableData.push(tableData);
      });
      this.loading = false;
      this.count = count;
      console.log(data);
    },
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.initTableData(row, ["", ""], "edit");
    },
    handleDelete() {},
    handleCurrentChange(val) {
      this.offset = val;
      this.initData();
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      console.log(res);
      // this.openData.image_path=
    },
    maskHandleDelete(index, row) {
      this.openData.specfoods.splice(index, 1);
    }
  },
  components: {
    page
  }
};
</script>
<style lang="scss">
.el-form--inline .el-form-item {
  width: 50%;
  margin-right: 0;
}
</style>