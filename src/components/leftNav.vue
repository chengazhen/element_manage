<template>
  <div class="leftNav">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="24"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <router-link to="/manage/" tag="span" slot="title">首页</router-link>
          </el-menu-item>
          <!-- 第一个导航 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="1-1">
              <router-link to="/manage/userList" tag="span">用户列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/manage/merchantList" tag="span">商家列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link to="/manage/foodList" tag="span">食品列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-4">
              <router-link to="/manage/orderList" tag="span">订单列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-5">
              <router-link to="/manage/anminList" tag="span">管理员列表</router-link>
            </el-menu-item>
          </el-submenu>
          <!-- 第二个导航 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>添加数据</span>
            </template>
            <el-menu-item index="2-1">
              <router-link to="/manage/addStore" tag="span">添加商铺</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/manage/addProduce" tag="span">添加商品</router-link>
            </el-menu-item>
          </el-submenu>
          <!-- 第三个导航 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>图表</span>
            </template>
            <el-menu-item index="3-1">
              <router-link to="/manage/userDis" tag="span">用户分布</router-link>
            </el-menu-item>
          </el-submenu>
          <!-- 第四个导航 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </template>
            <el-menu-item index="4-1">
              <router-link to="/manage/docEdit" tag="span">文本编辑</router-link>
            </el-menu-item>
          </el-submenu>
          <!-- 第五个导航 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="5-1">
              <router-link to="/manage/addAdmin" tag="span">管理员设置</router-link>
            </el-menu-item>
          </el-submenu>
          <!-- 第六个导航 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-question"></i>
              <span>说明</span>
            </template>
            <el-menu-item index="6-1">
              <router-link to="/manage/explain" tag="span">说明</router-link>
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
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
.leftNav {
  .tac {
    text-align: left;
  }
}
.leftNav .el-menu {
  border-right: none;
}
.el-submenu .el-menu-item-group .el-menu-item {
  border: none;
  min-width: 0;
  background-color: #1f2d3d !important;
}
</style>