<template>
  <div>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <el-tag>当天数据</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag type="success" :hit="true">用户注册:{{register}}</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag type="success">管理员注册:{{adminCount}}</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag type="success">订单数量:{{orderCount}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-tag>全部数据</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag type="info">用户注册:{{allCount}}</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag type="info">管理员注册:{{adminAll}}</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag type="info">订单数量:{{allOrder}}</el-tag>
        </el-col>
      </el-row>
    </div>
    <div>
      <render :seven-day="sevenDay" :seven-data="sevenData" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import api from "@/api/getData.js";
import render from "@/components/renderer.vue";
import dtTime from "time-formater";
export default {
  data() {
    return {
      register: 0,
      allCount: 0,
      adminCount: 0,
      adminAll: 0,
      orderCount: 0,
      allOrder: 0,
      sevenDay: [],
      sevenData: [[], [], []]
    };
  },
  created() {
    //生成近七天的日期
    let dateArr = [];
    for (let i = 0; i <= 6; i++) {
      const day = dtTime(new Date().getTime() - 86400000 * i).format(
        "YYYY-MM-DD"
      );
      dateArr.push(day);
    }
    this.sevenDay = dateArr.reverse();
    this.init();
    // console.log(this.sevenDay);
  },
  methods: {
    //初始化数据
    init() {
      let time = dtTime().format("YYYY-MM-DD");
      console.log(time);

      axios
        .all([
          api.getSignCount(time),
          api.getAdimCount(time),
          api.getOrder(time),
          api.getAdminAll(),
          api.getAallCount(),
          api.getAllOrder()
        ])
        .then(res => {
          this.register = res[0].data.count;
          this.adminCount = res[1].data.count;
          this.orderCount = res[2].data.count;
          this.adminAll = res[3].data.count;
          this.allCount = res[4].data.count;
          this.allOrder = res[5].data.count;
        });
      const apiData = [[], [], []];
      //并发接口请求数据把接口全部整合到一个数组
      this.sevenDay.forEach(item => {
        apiData[0].push(api.getSignCount(item));
        apiData[1].push(api.getAdimCount(item));
        apiData[2].push(api.getOrder(item));
      });
      const axiosArr = [...apiData[0], ...apiData[1], ...apiData[2]];
      // console.log(resultArr);
      //开始请求数据并且把数据分类分开来
      const DataArr = [[], [], []];
      axios
        .all(axiosArr)
        .then(res => {
          res.forEach((item, index) => {
            DataArr[Math.floor(index / 7)].push(item.data.count);
          });
          this.sevenData = DataArr;
          console.log(this.sevenData);
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  components: {
    render
  }
};
</script>
<style lang="scss" scoped>
.el-tag {
  font-size: 20px;
}
.el-row {
  margin-top: 20px;
}
</style>