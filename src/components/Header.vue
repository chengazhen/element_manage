<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <template v-for="(item,index) in $route.meta.path">
        <el-breadcrumb-item :key="index" v-if="index===0">
          <a href="Javascript:;">{{item}}</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item :key="index" v-else>{{item}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <el-dropdown trigger="hover" @command="handleCommand">
      <img :src="user" alt />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user-solid" command="user">用户信息</el-dropdown-item>
        <el-dropdown-item icon="el-icon-warning" command="out">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import api from "@/api/getData.js";
import user from "@/assets/images/default.jpg";
export default {
  data() {
    return {
      user
    };
  },
  methods: {
    async handleCommand(command) {
      if (command === "out") {
        try {
          console.log(api.getSignOut());
          const result = await api.getSignOut();
          console.log(result);
          if (result.data.status === 1) {
            this.$message(result.data.success);
            this.$router.push("/");
          } else {
            this.$message("退出失败");
          }
        } catch (e) {
          console.log(e);
        }
      } else if (command === "user") {
        this.$router.push("/manage/");
      }
    }
  }
};
</script>
<style lang="scss">
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>