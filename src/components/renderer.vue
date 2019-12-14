<template>
  <div>
    <div id="main" style="height:400px;"></div>
  </div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/axis";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";

// 基于准备好的dom，初始化echarts实例
export default {
  props: { sevenDay: Array, sevenData: Array },
  data() {
    return {
      series: [
        {
          name: "用户注册",
          type: "bar",
          data: [],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          }
        },

        {
          name: "管理员注册",
          type: "bar",
          data: [],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          }
        },
        {
          name: "订单数量",
          type: "bar",
          data: [],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          }
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    sevenData() {
      if (this.sevenData.length > 0) {
        for (let i = 0; i < this.series.length; i++) {
          this.series[i].data = this.sevenData[i];
        }
      }
      this.init();
      // console.log(this.sevenDay.reverse());
    }
  },
  methods: {
    init() {
      // console.log(this.sevenDay);
      let myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: { data: ["用户注册", "订单数量", "管理员注册"] },
        title: { text: "近期数据变化" },
        tooltip: { trigger: "axis" },
        xAxis: [{ data: this.sevenDay, type: "category" }],
        yAxis: [{ type: "value" }],
        series: this.series
      });
    }
  }
};
</script>
<style lang="scss">
#main {
  margin-top: 20px;
}
</style>