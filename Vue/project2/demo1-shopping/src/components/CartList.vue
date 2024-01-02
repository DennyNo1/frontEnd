<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <!-- 购物车开头 -->
    <div class="cart-title">
      <span class="all"
        >共<i>{{ GoodsList.data.list.length }}</i
        >件商品</span
      ><!--总类数-->
      <span @click="edit" class="edit">
        <van-icon name="edit" />
        编辑
      </span>
    </div>

    <!-- 购物车列表:图片，描述，价格 -->
    <div class="cart-list">
      <div
        class="cart-item"
        v-for="item in GoodsList.data.list"
        :key="item.goods_id"
      >
        <div>
          <van-checkbox
            v-model="item.isChecked"
            @click="change(item)"
            checked-color="#ee0a24"
          ></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="" />
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">
                ¥ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <div class="count-box">
                <button
                  @click="
                    update(item.goods_id, item.goods_num - 1, item.goods_sku_id)
                  "
                  class="minus"
                >
                  -
                </button>
                <input
                  class="inp"
                  v-model="item.goods_num"
                  type="text"
                  readonly
                />
                <button
                  @click="
                    update(item.goods_id, item.goods_num + 1, item.goods_sku_id)
                  "
                  class="add"
                >
                  +
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-fixed">
      <div class="all-check">
        <van-checkbox
          v-model="all"
          @click="allChecked"
          checked-color="#ee0a24"
          icon-size="18"
        ></van-checkbox>
        全选
      </div>

      <div class="all-total">
        <div class="price">
          <span>合计：</span>
          <span
            >¥ <i class="totalPrice">{{ totalPrice }}</i></span
          ><!---->
        </div>
        <div v-if="settle" @click="goPay" class="goPay">
          <!--购物车的结算按钮-->
          结算({{ this.GoodsList.data.cartTotal }})
        </div>
        <!--总件数-->
        <div v-else @click="deleteGoods" class="delete">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateCart, deleteCart } from "@/api/cart";
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  async created() {
    await this.$store.dispatch("cartlist/getCartList");
    this.GoodsList = this.$store.state.cartlist.cartList; //GoodsList显然是从vuex取出的数据

    console.log(this.GoodsList);
  },
  data() {
    return {
      GoodsList: {}, //这是从vuex取出的数据
      all: true,
      settle: true,
    };
  },
  methods: {
    async update(goodsId, goodsNum, goodsSkuId) {
      if (goodsNum < 1) {
        Toast("已到达最小数量，如要删除请点击编辑后删除");
        return;
      }
      await updateCart(goodsId, goodsNum, goodsSkuId);
      this.GoodsList.data.list.find(
        (item) => item.goods_id === goodsId
      ).goods_num = goodsNum; //更新组件的数据
    },
    allChecked() {
      console.log(this.all);
      for (let i = 0; i < this.GoodsList.data.list.length; i++) {
        this.GoodsList.data.list[i].isChecked = this.all;
      }
    },
    change(
      i //用于反转购物车内单个商品是否被勾选
    ) {
      if (i.isChecked === false) this.all = false;
    },
    edit() {
      this.settle = !this.settle;
    },
    async deleteGoods() {
      Dialog.confirm({
        title: "温馨提示",
        message: "你确认要删除这些商品吗",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(async () => {
          for (let i = 0; i < this.GoodsList.data.list.length; i++) {
            if (this.GoodsList.data.list[i].isChecked) {
              await console.log(deleteCart(this.GoodsList.data.list[i].id));
              this.GoodsList.data.list.splice(i, 1);
              i--;
            }
          }
        })
        .catch(() => {
          // on cancel.就是再逛逛，就是啥也不做，仅仅回退。
        });
    },
    goPay() {
      //用一个数组存储被选中商品的id
      let selectedGoods = [];
      for (let i = 0; i < this.GoodsList.data.list.length; i++) {
        if (this.GoodsList.data.list[i].isChecked) {
          selectedGoods.push(this.GoodsList.data.list[i].id);
        }
      }
      //需要判断是否有选中的商品
      if (selectedGoods.length === 0) {
        Toast("未选中任何商品");
        return;
      }
      //跳转地址，并将选中的商品的id附在地址中

      this.$router.push({
        path:'/settlement',
        query:{
          mode:'cart',
          cartIds:selectedGoods.join(',')
        }
      });
    },
  },
  computed: {
    totalPrice() {
      let total = 0; // Initialize total to 0

      for (let i = 0; i < this.GoodsList.data.list.length; i++) {
        if (this.GoodsList.data.list[i].isChecked === true) {
          total +=
            parseInt(this.GoodsList.data.list[i].goods.goods_price_min) *
            this.GoodsList.data.list[i].goods_num;
        }
      }

      return total; // Return the computed total
    },
  },
};
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay,
    .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}
</style>
