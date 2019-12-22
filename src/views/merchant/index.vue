<template>
  <div>
    //这是弹框表单
    <el-dialog title="修改店铺" :visible.sync="dialogFormVisible">
      <el-form :model="diaLogForm">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="diaLogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="详细地址:"
          class="address_box"
          prop="address"
          :label-width="formLabelWidth"
        >
          <el-autocomplete
            v-model="diaLogForm.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容:"
            @select="handleSelect"
          ></el-autocomplete>
          <div>当前地址:{{city.name}}</div>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input v-model="diaLogForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="diaLogForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-cascader
            :key="diaLogForm.id"
            :props="{checkStrictly:true}"
            v-model="category"
            :options="options"
            @change="look"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="店铺头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="diaLogForm.image_path"
              :src="imgBaseUrl+diaLogForm.image_path"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="diaLogFormEnter">确 定</el-button>
      </div>
    </el-dialog>

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
        <el-table-column label="操作" prop="desc" width="300">
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
    </div>
  </div>
</template>
<script>
import api, { imgBaseUrl } from "@/api/getData.js";
import page from "@/components/page.vue";
export default {
  data() {
    return {
      imgBaseUrl,
      limit: 20,
      offset: 0,
      count: 0,
      loading: true,
      dialogFormVisible: false,
      city: "",
      options: [], //所有选项
      diaLogForm: {},
      formLabelWidth: "120px",
      category: [], //默认选中值
      //展示数据部分
      tableData: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    //提交修改的店铺数据
    diaLogFormEnter() {
      this.dialogFormVisible = false;
      api
        .postUpdata(this.diaLogForm)
        .then(res => {
          if (res.data.status === 1) {
            this.$message({ message: "恭喜您修改成功", type: "success" });
            this.initData(); //初始化数据
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    look(value) {
      console.log(value.join("/"));
      this.diaLogForm.category = value.join("/");
    },
    handleAvatarSuccess(res, file) {
      if (res.status === 1) {
        this.diaLogForm.image_path = res.image_path;
      }
    },
    async initData() {
      const list = await api.getShopSort();
      let result = await api.getCity();
      this.city = result;
      list.forEach((element, index) => {
        let arr = {
          value: element.name,
          label: element.name,
          children: []
        };
        element.sub_categories.forEach((element, index) => {
          let arr_item = {
            value: element.name,
            label: element.name
          };
          arr.children.push(arr_item);
        });

        this.options.push(arr);
      });

      console.log(this.options);
      let params = {
        longitude: result.longitude,
        latitude: result.latitude,
        offset: this.offset,
        limit: this.limit
      };
      let data = await api.getMerchant(params);
      let count = await api.getMerCount();
      this.count = count;
      this.tableData = data;
      this.loading = false;
    },

    handleCurrentChange(val) {
      this.offset = val;
      this.initData();
    },
    //添加菜品
    handleAdd(index, val) {
      console.log(index, val);
      this.$router.push({ path: "/manage/addProduce", query: { id: val.id } });
    },
    // 编辑数据
    handleEdit(index, val) {
      this.dialogFormVisible = true;
      this.category = val.category.split("/"); //将选中值转为字符串
      this.diaLogForm = {
        id: val.id,
        name: val.name,
        address: val.address,
        description: val.description,
        phone: val.phone,
        image_path: val.image_path,
        category: val.category
      };
    },
    //删除商店
    handleDelete(index, row) {
      console.log(row);
      api
        .deleteShop(row.id)
        .then(res => {
          if (res.data.status === 1) {
            this.$message.success("修改成功");
          } else {
            if (res.data.status === 0) {
              this.$message.error("抱歉您的权限不够");
            }
          }
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    async querySearchAsync(queryString, cb) {
      console.log(queryString);
      let listPlace = [];
      if (queryString) {
        let list = await api.getLocation(this.id, queryString);
        console.log(list, list instanceof Array);
        if (list instanceof Array) {
          list.forEach(item => {
            let place = {
              value: item.address,
              address: item.address
            };
            listPlace.push(place);
          });
        }
      }
      if (listPlace.length > 0) {
        cb(listPlace);
        console.log(listPlace);
      }
    },
    handleSelect(item) {
      this.form.latitude = this.city.latitude;
      this.form.longitude = this.city.longitude;
      console.log(this.form.longitude, this.form.latitude);
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
.el-dialog__header {
  text-align: left;
}
.avatar {
  width: 100px;
  height: 100px;
}
</style>