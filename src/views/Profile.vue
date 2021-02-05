<template>
  <div class="profile">
    <user-base-info :info="user" bgc="white"></user-base-info>
    <user-main :main="main"></user-main>
  </div>
</template>

<script>
import UserBaseInfo from "components/content/profile/UserBaseInfo";
import UserMain from "components/content/profile/UserMain";
export default {
  name: "Profile",
  data() {
    return {
      user: {
        name: "谢敬涛",
        img:
          "http://s5.mogucdn.com/mlcdn/5abf39/171124_034aj1a82cijil22c3a5i4fbljfbg_640x640.jpg_160x160.jpg",
        vipImg:
          "https://s10.mogucdn.com/mlcdn/c45406/191010_2il1l3i91gkd5c461j93e5ehfcgi5_1404x216.png"
      },
      main: {
        base: [
          {
            title: "我的主页",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_7a9da7lh4a96lb1fl6b4gb854f3ji_75x75.png"
          },
          {
            title: "消息",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_6f41b17399aha0flla6chjb0lhk47_75x75.png"
          },
          {
            title: "收藏",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_31g4a5ebc8bj2f85cj4li8df89aab_75x75.png"
          },
          {
            title: "关注",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_0k9k5gh362a1kbk87hha8ff1bek69_75x75.png"
          }
        ],
        dingdan: [
          {
            title: "待付款",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_0ig16599k9l4f80g59cbkc6bcadid_75x75.png"
          },
          {
            title: "待发货",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_5j02c44liecec503kdldjbh72hca8_75x75.png"
          },
          {
            title: "待收货",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_56bd5eg3f4h47g2l1042436dc2950_75x75.png"
          },
          {
            title: "评价",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_8af1b27cfaed15fllab4j3hffh7h8_75x75.png"
          },
          {
            title: "退款售后",
            icon:
              "https://s10.mogucdn.com/mlcdn/c45406/190815_18db4je44bd6ej8ajg0l1950ia5ih_75x75.png"
          }
        ],
        mySet:[
          {
            title:'签到',
            icon:'https://s10.mogucdn.com/mlcdn/c45406/190815_6f13a0l26fcfcgkhei88f8248024k_75x75.png'
          },
          {
            title:'大姨妈',
            icon:'https://s10.mogucdn.com/mlcdn/c45406/190815_8444j6413ccf1b00hb923a7l491ad_75x75.png'
          },
          {
            title:'客服',
            icon:'https://s10.mogucdn.com/mlcdn/c45406/190815_54cd4b12ef09174hf1jkblbi69i2c_75x75.png'
          },
          {
            title:'达人中心',
            icon:'https://s10.mogucdn.com/mlcdn/c45406/190815_10lcah52ick650jc36hgg2kafkj5f_75x75.png'
          },
        ]
      }
    };
  },
  components: {
    UserBaseInfo,
    UserMain
  }
};
</script>

<style lang="less" scoped>
.profile {
  overflow: hidden;
  background: url("https://s10.mogucdn.com/mlcdn/c45406/190819_1j85g48lc84kk8deg00f66fk53dlc_750x229.png")
    no-repeat;
  background-size: 100%;
  background-color: #f6f6f6;
  height: 100vh;
  
}
</style>