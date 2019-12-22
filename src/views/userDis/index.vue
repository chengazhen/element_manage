<template>
  <div>
    <div id="main" style="height:400px;"></div>
  </div>
</template>
<script>
import api from "@/api/getData.js";
import echarts from "echarts/lib/echarts";
// 引入饼图
import "echarts/lib/chart/pie";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/axis";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
export default {
  data() {
    return {
      city: {}
    };
  },
  methods: {
    async init() {
      let myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "用户分布图",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["北京", "杭州", "上海", "深圳", "其他"]
        },
        series: [
          {
            name: "用户来源",
            type: "pie",
            radius: "65%",
            center: ["50%", "60%"],
            data: [
              { value: this.city.beijing, name: "北京" },
              { value: this.city.shanghai, name: "上海" },
              { value: this.city.shenzhen, name: "深圳" },
              { value: this.city.hangzhou, name: "杭州" },
              { value: this.city.qita, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      const data = await api.getCityUser();
      const { user_city } = data.data;
      this.city = user_city;
    }
  },
  watch: {
    city() {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>