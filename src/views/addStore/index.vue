<template>
  <div class="addShop">
    <h3>注册店铺</h3>
    <el-form :ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="店铺名称:" prop="name">
        <el-input v-model="form.name" type="inline-block"></el-input>
      </el-form-item>
      <el-form-item label="详细地址:" class="address_box" prop="address">
        <el-autocomplete
          v-model="form.address"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容:"
          @select="handleSelect"
        ></el-autocomplete>
        <div class="address">当前地址:{{city.name}}</div>
      </el-form-item>
      <el-form-item label="联系电话:" prop="phone">
        <el-input v-model.number="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介:">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语:">
        <el-input v-model="form.promotion_info"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类:" prop="category">
        <el-cascader v-model="form.category" :options="options"></el-cascader>
      </el-form-item>
      <el-form-item label="店铺特点:">
        <el-switch inactive-text="品牌保证" v-model="form.is_premium" active-color="#13ce66"></el-switch>
        <el-switch inactive-text="蜂鸟专送" v-model="form.delivery_mode   " active-color="#13ce66"></el-switch>
        <el-switch inactive-text="新店开张" v-model="form.news" active-color="#13ce66"></el-switch>
        <el-switch inactive-text="外卖保" v-model="form.bao" active-color="#13ce66"></el-switch>
        <el-switch inactive-text="准时达" v-model="form.zhun   " active-color="#13ce66"></el-switch>
        <el-switch inactive-text="开发票" v-model="form.piao   " active-color="#13ce66"></el-switch>
      </el-form-item>
      <el-form-item label="配送费:" prop="float_delivery_fee">
        <el-input-number v-model="form.float_delivery_fee" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="起送价:">
        <el-input-number v-model="form.float_minimum_order_amount" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="营业时间:">
        <el-col :span="8">
          <el-time-select
            placeholder="起始时间"
            v-model="form.startTime"
            :picker-options="{
           start: '08:30',
           step: '00:15',
           end: '18:30'
          }"
          ></el-time-select>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="8">
          <el-time-select
            :picker-options="{
             start: '08:30',
             step: '00:15',
             end: '18:30',
             minTime: form.startTime
           }"
            placeholder="结束时间"
            v-model="form.endTime"
          ></el-time-select>
        </el-col>
      </el-form-item>
      <el-form-item label="店铺头像:" prop="image_path">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/v1/addimg/shop'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload1"
        >
          <img v-if="form.image_path " :src="imgBaseUrl+form.image_path " class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="营业执照:">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/v1/addimg/shop'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload2"
        >
          <img
            v-if="form.business_license_image"
            :src="imgBaseUrl+form.business_license_image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="餐饮许可证:">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/v1/addimg/shop'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess3"
          :before-upload="beforeAvatarUpload3"
        >
          <img
            v-if="form.catering_service_license_image"
            :src="imgBaseUrl+form.catering_service_license_image "
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动优惠:">
        <el-select @change="selectActive" v-model="activeValue" placeholder="请选择">
          <el-option
            v-for="item in activeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-table :data="form.activities" style="width: 100%" height="250">
          <el-table-column fixed prop="icon_name" label="活动标题" width="150"></el-table-column>
          <el-table-column prop="name" label="活动名称" width="120"></el-table-column>
          <el-table-column prop="description" label="活动详情" width="120"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit( scope.$index,scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import qs from "qs";
// import  from "@/api/getData.js";
import api, { baseUrl, imgBaseUrl } from "@/api/getData.js";
import { async } from "q";
export default {
  name: "addStore",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { type: "number", message: "必须为数字值" }
        ],
        float_delivery_fee: [
          {
            type: "date",
            required: true,
            message: "请输入配送费",
            trigger: "change"
          }
        ],
        category: [
          {
            type: "array",
            required: true,
            message: "请选择店铺分类",
            trigger: "change"
          }
        ],
        image_path: [
          { required: true, message: "请上传店铺头像", trigger: "change" }
        ]
        // desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      form: {
        name: "哈根达斯旗舰店",
        address: "",
        latitude: "",
        category: ["异国料理", "全部异国料理"],
        longitude: "",
        phone: "",
        region: "",
        startTime: "",
        endTime: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        is_premium: false,
        delivery_mode: false,
        news: false,
        bao: false,
        zhun: false,
        piao: false,
        float_minimum_order_amount: 0,
        float_delivery_fee: 0,
        image_path: "",
        business_license_image: "",
        catering_service_license_image: "",
        activities: [
          { icon_name: "新", name: "新用户立减", description: "喝一瓶送三瓶" }
        ]
      },
      options: [],
      baseUrl,
      imgBaseUrl,
      city: "",
      id: 0,
      activeValue: "满减优惠",
      activeOptions: [
        {
          value: "满减优惠",
          label: "满减优惠"
        },
        {
          value: "优惠大酬宾",
          label: "优惠大酬宾"
        },
        {
          value: "新用户立减",
          label: "新用户立减"
        },
        {
          value: "进店领券",
          label: "进店领券"
        }
      ]
    };
  },
  created() {
    this.initData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },

    async initData() {
      //请求店铺种类
      const list = await api.getShopSort();
      const city = await api.getCity();
      console.log(city);
      this.city = city || "自动选为商丘";
      this.id = city.id || 0;
      list.forEach(element => {
        let arr = {
          value: element.name,
          label: element.name,
          children: []
        };
        element.sub_categories.forEach(element => {
          let arr_item = {
            value: element.name,
            label: element.name
          };
          arr.children.push(arr_item);
        });
        this.options.push(arr);
      });
    },
    //上传店铺头像
    handleAvatarSuccess1(res, file) {
      if (res.status === 1) {
        this.form.image_path = res.image_path;
      } else {
        this.$message.error("图片上传失败");
      }
    },
    beforeAvatarUpload1(file) {
      const isRightJPG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightJPG && isLt2M;
    },
    // 上传营业执照
    handleAvatarSuccess2(res, file) {
      if (res.status === 1) {
        this.form.business_license_image = res.image_path;
      } else {
        this.$message.error("图片上传失败");
      }
    },
    beforeAvatarUpload2(file) {
      const isRightJPG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightJPG && isLt2M;
    },
    // 上传食品许可证
    handleAvatarSuccess3(res, file) {
      if (res.status === 1) {
        this.form.catering_service_license_image = res.image_path;
      } else {
        this.$message.error("图片上传失败");
      }
    },
    beforeAvatarUpload3(file) {
      const isRightJPG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightJPG && isLt2M;
    },
    // 远程搜索的方法
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
    },
    //优惠活动详情
    selectActive(val) {
      // console.log(val);
      let act = {};
      switch (val) {
        case "满减优惠":
          act.icon_name = "满";
          act.name = val;
          break;
        case "优惠大酬宾":
          act.icon_name = "惠";
          act.name = val;
          break;
        case "新用户立减":
          act.icon_name = "新";
          act.name = val;
          break;
        case "进店领券":
          act.icon_name = "券";
          act.name = val;
          break;
      }
      this.$prompt("请输入活动详情", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          console.log(value);
          act.description = value;
          this.form.activities.push(act);
          this.$message({
            type: "success",
            message: "活动详情为: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleEdit() {},
    //删除优惠
    handleDelete(index, row) {
      this.form.activities.splice(index, 1);
    },
    //提交表单
    onSubmit(formName) {
      console.log(formName);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let result = await api.postAddShop(this.form);
            console.log(result);
            if (result.status === 1) {
              this.$message("添加成功");
              this.form = {
                name: "哈根达斯旗舰店",
                address: "",
                phone: 13836033333,
                region: "",
                latitude: "",
                category: ["异国料理", "全部异国料理"],
                longitude: "",
                startTime: "",
                endTime: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                is_premium: false,
                delivery_mode: false,
                news: false,
                bao: false,
                zhun: false,
                piao: false,
                float_minimum_order_amount: 0,
                float_delivery_fee: 0,
                image_path: "",
                business_license_image: "",
                catering_service_license_image: "",
                activities: [
                  {
                    icon_name: "新",
                    name: "新用户立减",
                    description: "喝一瓶送三瓶"
                  }
                ]
              };
            } else {
              this.$message(result.message);
            }
          } catch (e) {
            console.log(e);
          }

          // alert("submit!");
        } else {
          this.$message.error("请输入必填项");
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item__label {
  // width: auto !important;
  // style="width:auto"
  color: #000000;
}

.addShop {
  border: 1px solid #3e3e3e;
  padding: 10px;
  width: 70%;
  margin: 0 auto;
  h3 {
    margin-bottom: 10px;
  }
}

.el-switch__label.is-active {
  color: #303133;
}
.el-switch__label * {
  margin-left: 10px;
}

.el-table th {
  color: #000000;
  background-color: #eff2f7;
}
</style>
