<template>
  <div class="home">
    <!-- 
      <el-input   placeholder="请输入账号" v-model="acount"></el-input>
      <br />
      <br />
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <br />
      <br />
      <el-button type="primary" @click="enter()">登录</el-button>
    </section>-->
    <transition appear appear-active-class="animated fadeInDown">
      <section class="form">
        <h1>后台管理系统</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="acount">
            <el-input type="text" v-model="ruleForm.acount" autocomplete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/getData.js";
import { mapState, mapMutations, mapActions } from "vuex";
import { async } from "q";
export default {
  name: "home",
  components: {},
  data() {
    //表单验证方法
    var validateacount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      //验证表单
      ruleForm: {
        acount: "",
        pass: ""
      },
      //验证规则
      rules: {
        acount: [{ validator: validateacount, trigger: "blur" }],
        pass: [{ validator: validatepass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["getAdminInfo"]),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 辨别是否有用户
          let result = await api.postLogin(
            this.ruleForm.acount,
            this.ruleForm.pass
          );
          if (result.data.status === 1) {
            this.$message("恭喜登录成功");
            this.$router.push("/manage");
          } else if (result.data.status === 0) {
            console.log(result);
            this.$message(result.data.message);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },

  watch: {
    adminInfo(newValue, old) {
      // console.log(newValue, old);
      if (newValue) {
        this.$message({
          message: "检测到之前登录过,已经为您自动登录",
          type: "success"
        });
        this.$router.push("/manage");
      }
    }
  },
  mounted() {
    // console.log(2);
    if (!this.adminInfo.id) {
      console.log("执行");
      this.getAdminInfo();
    }
  },
  computed: {
    ...mapState(["adminInfo"])
  }
};
</script>
<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #324057;
  .form {
    position: relative;
    width: 350px;
    padding: 30px;
    border-radius: 10px;
    background-color: #fff;
    .el-button {
      width: 100%;
    }
    h1 {
      position: absolute;
      left: 0;
      right: 0;
      font-size: 20px;
      margin: 0 auto;
      top: -80px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
