<template>
  <div class="fenleiviwe">
    <nav-bar bgc="pink">
      <template #left>
        <go-back>
          <template>
            <img src="~assets/img/goback/goback.png" alt />
          </template>
        </go-back>
      </template>
      <template #center>
        <div class="center_box">
          <span class="search_icon"></span>
          <input class="nav_input" type="text" name id />
        </div>
      </template>
      <template #right>
        <go-cart></go-cart>
      </template>
    </nav-bar>

    <van-tabs v-model="categroy.curIndex">
      <van-tab v-for="item in categroy.data" :title="item.text" :key="item.id"></van-tab>
    </van-tabs>
    <goods-view bgc="white" :column="2">
      <template>
        <goods-view-item v-for="item in curGoods(categroy.curIndex+1)" :key="item.id" @click.native="itemC(item)">
          <template #gimg>
            <img :src="item.img" alt />
          </template>
          <template #gname>
            <p>{{item.gname}}</p>
          </template>
          <template #price>
            <span>{{item.price|priceFilter}}</span>
          </template>
          <template #zan>
            <span>{{item.zan}}</span>
          </template>
        </goods-view-item>
      </template>
    </goods-view>
  </div>
</template>

<script>
import GoBack from "components/common/goback/GoBack";
import NavBar from "components/common/navbar/NavBar";
import GoCart from "components/common/gocart/GoCart";
import GoodsView from "components/common/goodsview/GoodsView";
import GoodsViewItem from "components/common/goodsview/GoodsViewItem";

export default {
  name: "FenleiView",
  data() {
    return {
      categroy: {
        data: [],
        curIndex: 0
      },
      goods: {
        data: []
      },
      
    };
  },
  methods:{
    itemC(item) {
      this.$router.push({
        path: `goods/${item.id}`,
        query: {
          categroy_base_id: item.categroy_base_id
        }
      });

    },
  },

  components: {
    GoBack,
    NavBar,
    GoCart,
    GoodsView,
    GoodsViewItem
  },
  computed: {
    curGoods(categroyId) {
      return categroyId => {
        return this.goods.data.filter((item, index) => {
          return item.categroy_id == categroyId;
        });
      };
    }
  },
  mounted() {
    
    
    
  },
  activated(){
    this.$bus.$on("categroyClick", (categroyData, curCategroy) => {
      this.categroy.curIndex = curCategroy - 1;
    });
    
  },
  created() {
    this.request({
      url: "/queryfenleiview",
      method: "get"
    }).then(
      res => {
        // console.log(res);
        this.categroy.data = res.categroy;
        this.goods.data = res.goods;
      },
      err => {
        throw err;
      }
    );
  },
  
};
</script>

<style lang="less" scoped>
.fenleiviwe {
  padding-top: 44px;
}
.center_box {
  position: relative;
  .search_icon {
    display: block;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    background-image: url("~assets/img/icon/search.png");
    background-repeat: no-repeat;
    background-size: 14px;
  }
  .nav_input {
    border: none;
    border-radius: 10px;
    height: 25px;
    padding-left: 30px;
  }
}

.van-tabs {
  position: sticky;
  top: 44px;
}
</style>