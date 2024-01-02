import request from "@/utils/request";
export const getAddresList = () => {
  return request.get("/address/list", {});
};

//从购物车进入结算页面
export const settleOrder = (
  mode	,
  delivery,
  shopId	,
  couponId	,
  isUsePoints,	
  cartIds	
) => {
  return request.get("/checkout/order", {
    params: {
      mode	,
      delivery,
      shopId	,
      couponId	,
      isUsePoints	,
      cartIds	
    },
  });
};
//结算
export const settle =(mode,remark) =>

{
  return request.post('/checkout/submit',{
    goodsId:'',
    goodsNum:'',
    goodsSkuId:'',
    delivery:"10",
    couponId:"0",
    isUsePoints:0,
    mode:mode,
    payType:"10",
    remark:remark,
    cartIds:''


  })
}