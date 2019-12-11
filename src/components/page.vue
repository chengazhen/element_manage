<template>
  <div class="pag_box">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="20"
      :pager-count="9"
      layout="prev, pager, next"
      :total="count"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    count: Number
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.$parent.handleCurrentChange(val);
    }
  }
};
</script>
<style lang="scss">
  .pag_box{
    padding-top: 20px;
  }
</style>