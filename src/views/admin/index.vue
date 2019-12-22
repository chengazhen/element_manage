<template>
  <div class="admin">
    <h3>名称:{{adminInfo.user_name}}</h3>
    <h3>ID:{{adminInfo.id}}</h3>
    <h3>注册时间:{{adminInfo.create_time}}</h3>
    <h3>城市:{{adminInfo.city}}</h3>
    <h3>身份:{{adminInfo.admin}}</h3>
    <div class="avatar">
      <h3>更换用户头像:</h3>
      <img :src="imgBaseUrl+adminInfo.avatar" alt="用户头像" />
    </div>
  </div>
</template>
<script>
import api, { imgBaseUrl } from "@/api/getData.js";
export default {
  name: "admin",
  data() {
    return {
      adminInfo: {},
      imgBaseUrl
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const data = await api.getAdimData();
      if (data.status === 1) {
        this.adminInfo = data.data;
      }
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.admin {
  padding-left: 20px;
  h3,
  .avatar {
    text-align: left;
    line-height: 30px;
  }
}
</style>