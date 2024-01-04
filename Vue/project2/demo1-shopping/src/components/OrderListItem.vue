<template>
  <div>
    <div v-for="item in list.data" :key="item.order_id">
      <div v-if="item.state_text!=='待取消'">
        <div class="order-list-item">
          <div class="tit">
            <div class="time">{{ item.create_time }}</div>
            <div class="status">
              <span>{{ item.state_text }}</span>
            </div>
          </div>
          <div class="list">
            <div class="list-item" v-for="i in item.goods" :key="i.goods_id">
              <div class="goods-img">
                <img :src="i.goods_image" alt="" />
              </div>
              <div class="goods-content text-ellipsis-2">
                {{ i.goods_name }}
              </div>
              <div class="goods-trade">
                <p>¥ {{ i.goods_price }}</p>
                <p>x {{ i.total_num }}</p>
              </div>
            </div>
          </div>
          <div class="total">共12件商品，总金额 ¥{{ item.total_price }}</div>
          <div class="actions">
            <span v-if="false">立刻付款</span>
            <span v-if="true" @click="cancelOrder(item.order_id)"
              >申请取消</span
            >
            <span v-if="false">确认收货</span>
            <span v-if="false">评价</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cancel } from "@/api/order";
export default {
  props: ["list"],
  methods: {
    async cancelOrder(order_id) {
      const res = await cancel(order_id);
      console.log(res);
      location.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.order-list-item {
  margin: 10px auto;
  width: 94%;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 0.5px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  color: #333;
  font-size: 13px;

  .tit {
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .status {
      color: #fa2209;
    }
  }

  .list-item {
    display: flex;
    .goods-img {
      width: 90px;
      height: 90px;
      margin: 0px 10px 10px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-content {
      flex: 2;
      line-height: 18px;
      max-height: 36px;
      margin-top: 8px;
    }
    .goods-trade {
      flex: 1;
      line-height: 18px;
      text-align: right;
      color: #b39999;
      margin-top: 8px;
    }
  }

  .total {
    text-align: right;
  }
  .actions {
    text-align: right;
    span {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      color: #383838;
      border: 0.5px solid #a8a8a8;
      font-size: 14px;
      padding: 0 15px;
      border-radius: 5px;
      margin: 10px 0;
    }
  }
}
</style>
