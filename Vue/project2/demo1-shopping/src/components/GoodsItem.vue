<template>
  <div class="goods-item" @click="go">
    <div class="left">
      <img :src="childProps.goods_image" alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2">
        {{ childProps.goods_name }}
      </p>
      <p class="count">已售{{ childProps.goods_sales }}件</p>
      <p class="price">
        <span class="new">¥{{ childProps.goods_price_min }}</span>
        <span class="old">¥{{ childProps.line_price_max }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    childProps: Object,
  },
  methods: {
    async go() {
      //console.log(typeof this.childProps);

      // 确保在访问其属性之前，等待异步操作完成
      //await this.$nextTick();

      // 继续使用this.childProps
      this.$router.push(`/prodetail?goods_id=${this.childProps.goods_id}`).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.goods-item {
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
