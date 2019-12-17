<template>
  <div>
    <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item
          label="规格"
          :label-width="formLabelWidth"
          prop="specs"
          :rules="[
           { required: true, message: '请输入规格', trigger: 'blur' },
           ]"
        >
          <el-input v-model="form.specs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装费" :label-width="formLabelWidth">
          <el-input-number v-model="form.packing_fee" :min="1" :max="10" label="包装费"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input-number v-model="form.price" :min="1" :max="10" label="价格"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="moreEnter()">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <h3>添加商品</h3>
      <p>{{$route.query.id}}</p>
      <el-row>
        <el-col :span="14" :offset="4">
          <el-card>
            <el-form :model="sortData" ret="sortData" label-width="120px" class="demo-sort">
              <el-form-item prop="sort" label="食品种类名称">
                <el-select
                  v-model="sortData.sort"
                  placeholder="请选择"
                  @change="handle"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!-- <h3></h3> -->
            <el-collapse>
              <el-collapse-item title="点击添加食品种类">
                <el-form ref="addform" :model="addform" label-width="100px">
                  <el-form-item
                    label="食品种类"
                    prop="name"
                    :rules="[{ required: true, message: '请输入要添加的食品种类', trigger: 'blur' },]"
                  >
                    <el-input v-model="addform.name"></el-input>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="addform.description"></el-input>
                  </el-form-item>
                  <el-form-item label>
                    <el-button type="primary" @click="onSubmitAdd('addform')">添加</el-button>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-card class="box-card">
            <el-form
              :model="dynamicValidateForm"
              ref="dynamicValidateForm"
              label-width="120px"
              class="demo-dynamic"
            >
              <el-form-item
                prop="name"
                label="食品名称"
                :rules="[{ required: true, message: '请输入食品名称', trigger: 'blur' },]"
              >
                <el-input v-model="dynamicValidateForm.name"></el-input>
              </el-form-item>
              <el-form-item label="食品活动">
                <el-input v-model="dynamicValidateForm.active"></el-input>
              </el-form-item>
              <el-form-item label="食品详情">
                <el-input v-model="dynamicValidateForm.description"></el-input>
              </el-form-item>
              <el-form-item
                label="上传图片"
                prop="image_path"
                :rules="[{ required: true, message: '请上传图片', trigger: 'change' },]"
              >
                <el-upload
                  class="avatar-uploader"
                  action="https://elm.cangdu.org/v1/addimg/food"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="dynamicValidateForm.image_path"
                    :src="imgBaseUrl+dynamicValidateForm.image_path"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="食品特点">
                <el-select multiple v-model="dynamicValidateForm.attributes" placeholder="请选择">
                  <el-option
                    v-for="item in attrOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="食品规格">
                <el-radio v-model="specsRadio" label="单规格" @change="single"></el-radio>
                <el-radio v-model="specsRadio" label="多规格" @change="more"></el-radio>
              </el-form-item>
              <div v-if="isSingle">
                <el-button type="success" @click="dialogFormVisible = true">添加规格</el-button>
                <el-form-item label class="moreForm_box">
                  <el-table :data="dynamicValidateForm.specs">
                    <el-table-column prop="specs" label="规格"></el-table-column>
                    <el-table-column prop="packing_fee" label="包装费"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column label="操作" width="200">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item label="包装费">
                  <el-input-number
                    v-model="dynamicValidateForm.specs[0].packing_fee"
                    @change="handleChangePacking_fee"
                    :min="1"
                    :max="10"
                    label="包装费"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="价格">
                  <el-input-number
                    v-model="dynamicValidateForm.specs[0].price"
                    @change="handleChangePrice"
                    :min="1"
                    :max="10"
                    label="价格"
                  ></el-input-number>
                </el-form-item>
              </div>
              <el-form-item class="submit_box">
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">确认添加食品</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from "@/api/getData.js";
import { imgBaseUrl } from "@/api/getData.js";
import { MessageBox } from "element-ui";
import { Message } from "element-ui";
export default {
  name: "addProduce",
  data() {
    return {
      form: {
        specs: "",
        packing_fee: 1,
        price: 20
      },
      //商品数据
      dynamicValidateForm: {
        restaurant_id: this.$route.query.id,
        category_id: "",
        name: "",
        active: "",
        description: "",
        image_path: "",
        attributes: [],
        specs: [{ specs: "默认", packing_fee: 1, price: 1 }],
        description: ""
      },
      //商品种类数据
      addform: {
        name: "",
        description: ""
      },
      //选中商品种类
      sortData: {
        sort: ""
      },
      attrOptions: [
        {
          value: "新",
          label: "新品"
        },
        {
          value: "招",
          label: "招牌"
        }
      ],
      options: [],
      id: this.$route.query.id,
      imgBaseUrl,
      specsRadio: "单规格",
      isSingle: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "80px"
    };
  },

  methods: {
    //多规格
    moreEnter() {
      if (this.form.specs) {
        this.dynamicValidateForm.specs.push(this.form);
        this.dialogFormVisible = false;
        console.log(this.dynamicValidateForm.specs);
      } else {
        this.$notify({
          title: "提示",
          message: "请填写规格",
          duration: 0
        });
      }
    },
    handleDelete(index, value) {
      console.log(index, value);
      this.dynamicValidateForm.specs.splice(index, 1);
    },
    handleEdit(index, value) {
      console.log(index, value);
    },

    //规格选择
    single(val) {
      this.isSingle = false;
      console.log(val);
    },
    more(val) {
      console.log(val);
      this.isSingle = true;
    },
    handleChangePacking_fee(val) {
      console.log(val);
    },
    handleChangePrice(val) {
      console.log(val);
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.dynamicValidateForm.image_path = res.image_path;
      console.log(res);
    },
    //提交添加商品数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.dynamicValidateForm, this.id);
          if (this.dynamicValidateForm.category_id) {
            api
              .postAddProduce(this.dynamicValidateForm)
              .then(res => {
                console.log(res);
                if (res.data.status === 1) {
                  this.$message.success("添加食品成功");
                  this.dynamicValidateForm = {
                    restaurant_id: this.$route.query.id,
                    category_id: "",
                    name: "",
                    active: "",
                    description: "",
                    image_path: "",
                    attributes: [],
                    specs: [{ specs: "默认", packing_fee: 1, price: 1 }],
                    description: ""
                  };
                  this.sortData = {
                    sort: ""
                  };
                } else {
                  this.$message.error("添加食品失败");
                }
              })
              .catch(res => {
                console.log(res);
              });
            // alert("submit!");
          } else {
            console.log(this.dynamicValidateForm.category_id);
            this.$message.error("请选择商品种类");
            return false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加食品种类
    onSubmitAdd(val) {
      let params = {
        name: this.addform.name,
        description: this.addform.description,
        restaurant_id: this.id
      };
      this.$refs[val].validate(valid => {
        if (valid) {
          try {
            const result = api
              .postAddGoodsSort(params)
              .then(res => {
                if (res.data.status === 1) {
                  this.$message.success("添加成功");
                  this.init();
                } else {
                  this.$message.error("添加失败");
                }
              })
              .catch(res => {
                console.log(res);
              });
          } catch (e) {
            console.log(e);
          }
        } else {
          return false;
        }
      });
    },
    //初始化数据
    async init() {
      try {
        if (this.$route.query.id) {
          const id = this.$route.query.id;
          const result = await api.getProduceSort(id);
          if (result.data.status === 1) {
            this.options = result.data.category_list;
          }
          console.log(result);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //选择商品种类
    handle(val) {
      // console.log(val)
      this.dynamicValidateForm.category_id = val;
      console.log(val);
    }
  },
  created() {
    this.init();
  },
  //路由进入之前判定一下是否携带商店id
  beforeRouteEnter({ query }, from, next) {
    if (!query.id) {
      MessageBox.confirm("请选择好商店再来添加商品", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          Message.success({
            message: "前往商家列表"
          });
          next("/manage/merchantList");
        })
        .catch(action => {
          Message.warning({
            message: "您取消了操作,请选择其他服务"
          });
          next({ path: from.path });
        });
    } else {
      next();
    }
  }
};
</script>
<style lang="scss">
.submit_box {
  & .el-form-item__content {
    margin-left: 0 !important;
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
.el-row {
  display: flex;
}
.el-col {
  margin: 0 auto;
}
.el-select {
  display: block;
}
.el-collapse-item__header {
  text-align: center;
}
</style>
<style lang="scss">
.moreForm_box .el-form-item__content {
  margin-left: 0 !important;
}
.el-dialog {
  border-radius: 10px;
}
</style>
