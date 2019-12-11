<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" v-if="!$route.meta.flag">
        <div class="nav">
          <left />
          <div class="full"></div>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <top />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import left from "@/components/leftNav";
import top from "@/components/Header";
export default {
  components: {
    left,
    top
  },
  data() {
    return {
      home: true,
    };
  },
 
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-main {
  padding: 0;
  // overflow: hidden;
}
.nav {
  width: 200px;
  height: 100%;
  overflow: hidden;
  .full {
    // box-sizing: border-box;
    // border-right: solid 1px #e6e6e6;
    background-color: #324057;
    height: 100%;
  }
}
.el-header {
  background-color: #eff2f7;
}
</style>
