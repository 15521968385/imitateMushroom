<template>
  <div class="categroy">
    <div class="sidebar">
      <van-sidebar v-model="categroy.curIndex">
        <van-sidebar-item v-for="item in categroy.data" :key="item.id" :title="item.text" />
      </van-sidebar>
    </div>
    <div class="goods_view">
      <goods-view bgc="white" :column="2">
        <template>
          <goods-view-item
            v-for="item in curGoods(categroy.curIndex+1)"
            :key="item.id"
            @click.native="itemC(item)"
          >
            <template #gimg>
              <img :src="item.img" alt />
            </template>
            <template #gname>
              <p>{{item.gname}}</p>
            </template>
            <template #price>
              <span>{{item.prices|priceFilter}}</span>
            </template>
            <template #zan>
              <span>{{item.zan}}</span>
            </template>
          </goods-view-item>
        </template>
      </goods-view>
    </div>
  </div>
</template>

<script>
import GoodsView from "components/common/goodsview/GoodsView";
import GoodsViewItem from "components/common/goodsview/GoodsViewItem";
import Scroll from "components/common/scrollview/BetterScrollView";
export default {
  name: "Categroy",
  data() {
    return {
      categroy: {
        data: [],
        curIndex: 0
      },
      goods: {
        data: []
      }
    };
  },
  methods: {
    getData() {
      this.request({
        url: "/queryfenleiview",
        method: "get"
      }).then(
        res => {
          console.log(res);
          this.categroy.data = res.categroy;
          this.goods.data = res.goods;
        },
        err => {
          throw err;
        }
      );
    },
    itemC(item) {
      this.$router.push({
        path: `goods/${item.id}`,
        query: {
          categroy_base_id: item.categroy_base_id
        }
      });
    }
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
  components: {
    GoodsView,
    GoodsViewItem,
    Scroll
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.categroy {
  display: flex;
  .sidebar {
    width: 80px;
    height: 517px;
    overflow-y: scroll;
  }
  .goods_view {
    flex: 1;
    height: 517px;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .goods_view::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>