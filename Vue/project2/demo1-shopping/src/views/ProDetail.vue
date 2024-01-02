<template>
  <div class="prodetail">
    <van-nav-bar
      fixed
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item
        v-for="item in goods_details.goods_images"
        :key="item.goods_id"
      >
        <img :src="item.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }} / {{ goods_details.goods_images.length }}
        </div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ goods_details.line_price_min }}</span>
          <span class="oldprice">￥{{ goods_details.goods_price_min }}</span>
        </div>
        <div class="sellcount">已售{{ goods_details.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ goods_details.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ this.number }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /></div>
      </div>
      <div class="comment-list">
        <div
          class="comment-item"
          v-for="item in this.comment_short"
          :key="item.comment_id"
        >
          <div class="top">
            <img :src="item.user.avatar_url" alt="" />
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate
              :size="16"
              :value="5"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc">
      <img
        v-for="item in goods_details.goods_images"
        :key="item.goods_id"
        :src="item.external_url"
        alt=""
      />
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon
          name="shopping-cart-o"
          :badge="total_number"
        /><!--购物车图标，用于跳转购物车页面-->
        <span>购物车</span>
      </div>
      <div @click="addCart" class="btn-add">加入购物车</div>
      <!--外部的：购物车或者立刻购买-->
      <div @click="buyNow" class="btn-buy">立刻购买</div>
    </div>

    <!--弹窗：购物车或者立刻购买-->
    <div>
      <van-action-sheet
        v-model="showPannel"
        :title="mode === 'cart' ? '加入购物车' : '立刻购买'"
      >
        <div class="product">
          <div class="product-title">
            <div class="left">
              <img :src="goods_details.goods_image" alt="" />
            </div>
            <div class="right">
              <div class="price">
                <span>¥</span>
                <span class="nowprice">{{ goods_details.line_price_min }}</span>
              </div>
              <div class="count">
                <span>库存</span>
                <span>{{ goods_details.stock_total }}</span>
              </div>
            </div>
          </div>
          <div class="num-box">
            <span>数量</span>
            <div class="count-box">
              <button @click="handleSub" class="minus">-</button>
              <input :value="init_number" class="inp" type="text" />
              <button @click="handleAdd" class="add">+</button>
            </div>
          </div>

          <div class="showbtn" v-if="true">
            <div class="btn" v-if="true" @click="addCart2">加入购物车</div>
            <div class="btn now" v-else>立刻购买</div>
            <!--这个立刻购买，因为后端数据库接口没配置好，所以前端也写不了-->>
          </div>

          <div class="btn-none" v-else>该商品已抢完</div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import { addCart2 } from "@/api/cart";
import { getDetails } from "@/api/details";
import { getCommentNumber, getComment } from "@/api/comment";
import test from '@/mixins/test'
import { Dialog } from "vant";

export default {
  name: "ProDetail",
  mixins:[test],
  data() {
    return {
      current: 0,
      goods_id: "",
      goods_details: { goods_images: [] },
      comment_number: {},
      number: 0,
      comment_short: {},
      showPannel: false,
      mode: "cart",
      init_number: 1,
      token_not_exist: false,
      total_number: 0,
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    async addCart() {
      this.showPannel = true;
    },
    buyNow() {
      this.showPannel = true;
      this.mode = "buyNow";
    },
    handleAdd() {
      if (this.init_number < this.goods_details.stock_total)
        this.init_number += 1;
    },
    handleSub() {
      if (this.init_number > 0) this.init_number -= 1;
    },
    //商品加入购物车。判断用户是否登录。没登录让它登录。
    async addCart2() {
      {
        //如果用户登录了
        if (!this.$store.state.user.userInfo.token) {
          //如果用户没有登录
          Dialog.confirm({
            title: "温馨提示",
            message: "您还没有登录",
            confirmButtonText: "去登录",
            cancelButtonText: "再逛逛",
          })
            .then(() => {
              const currentPath = this.$route.fullPath;
              this.$router.push({
                path: "/login",
                query: { from: currentPath },
              });
            })
            .catch(() => {
              // on cancel.就是再逛逛，就是啥也不做，仅仅回退。
            });
        }

        //console.log(this.goods_details);
        const res = await addCart2(
          this.goods_details.goods_id,
          this.init_number,
          this.goods_details.skuList[0].goods_sku_id
        );
        //这都是单个商品的数据
        this.total_number = res.data.cartTotal; //购物车的商品总数量竟然保存在后端
        //存商品数据到vuex
        let payload = {
          id: this.goods_details.goods_id,
          image: this.goods_details.goods_image,
          describe: this.goods_details.goods_name,
          price: this.goods_details.line_price_min * this.init_number,
          number: this.init_number,
        };
        this.$store.commit("cartNumber/addCartList", payload);
        this.showPannel = false;
      }
    },
  },
  async created() {
    this.sayHi();
    this.goods_id = this.$route.query.goods_id;
    const response = await getDetails(this.goods_id);
    console.log(response);
    this.goods_details = response.data.detail;
    console.log(this.goods_details);

    //获取评论
    this.comment_number = await getCommentNumber(this.goods_id);
    this.number = this.comment_number.data.total.all;
    const response_1 = await getComment(this.goods_id, 3);
    console.log(response_1);
    this.comment_short = response_1.data.list;

    //获取购物车商品总数量
    const res = await addCart2(
      this.goods_details.goods_id,
      this.init_number,
      this.goods_details.skuList[0].goods_sku_id
    );
    this.total_number = res.data.cartTotal;
  },
};
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn,
  .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
.count-box {
  width: 110px;
  display: flex;
  .add,
  .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
