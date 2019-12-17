<template>
  <div class="leftNav">
    <el-row class="tac">
      <el-col :span="24" style="background-color: #324057;">
        <el-menu
          :default-active="defaultClass"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/manage/">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <!-- 第一个导航 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="/manage/userList">用户列表</el-menu-item>
            <el-menu-item index="/manage/merchantList">商家列表</el-menu-item>
            <el-menu-item index="/manage/foodList">食品列表</el-menu-item>
            <el-menu-item index="/manage/orderList">订单列表</el-menu-item>
            <el-menu-item index="/manage/anminList">管理员列表</el-menu-item>
          </el-submenu>
          <!-- 第二个导航 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>添加数据</span>
            </template>
            <el-menu-item index="/manage/addStore">添加商铺</el-menu-item>
            <el-menu-item index="/manage/addProduce">添加商品</el-menu-item>
          </el-submenu>
          <!-- 第三个导航 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>图表</span>
            </template>
            <el-menu-item index="/manage/userDis">用户分布</el-menu-item>
          </el-submenu>
          <!-- 第四个导航 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </template>
            <el-menu-item index="/manage/docEdit">文本编辑</el-menu-item>
          </el-submenu>
          <!-- 第五个导航 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="/manage/addAdmin">管理员设置</el-menu-item>
          </el-submenu>
          <!-- 第六个导航 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-question"></i>
              <span>说明</span>
            </template>
            <el-menu-item index="/manage/explain">
              说明
              <router-link to tag="span"></router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  computed: {
    defaultClass() {
      console.log(this.$route.path);
      return this.$route.path;
      //是当前菜单可以处于激活样式
    }
  }
};
</script>
<style lang="scss" scoped>
.leftNav {
  .tac {
    text-align: left;
  }
  .el-menu,
  .el-menu-item {
    border: none;
    min-width: 0;
    background-color: #324057;
  }
  .el-submenu .el-menu-item {
    background-color: #1f2d3d;
  }
  span {
  }
}
.leftNav .el-menu {
  border-right: none;
}
</style>
<style lang="scss">
.leftNav {
  .el-submenu .el-menu-item:hover,
  .el-submenu .el-submenu__title:hover {
    background-color: #48576a !important;
  }
}
</style>