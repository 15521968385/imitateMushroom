<template>
  <div class="userbaseinfo" :style="{backgroundColor:bgc}">
    <div class="main">
      <img class="user_img" :src="info.img" alt="">
      <h4>{{info.name}}</h4>
      <img class="vip_img" :src="info.vipImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBaseInfo",
  props:{
    info:{
      type:Object
    },
    bgc:{
      type:String
    }
  }
};
</script>

<style lang="less" scoped>
.userbaseinfo{
  text-align: center;
  width: 90%;
  border-radius: 10px;
    margin: 50px auto 0;
  .main{
    position: relative;
    padding-top: 25px;
    .user_img{
      width: 51px;
      border: 3px solid white;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    h4{
      color: #5e5e5e;
      padding: 5px;
    }
    .vip_img{
      width: 100%;
    }
  }
}

</style>