import request from '@/utils/request'
export const addCart2 = (goodsId, goodsNum, goodsSkuId) => {
    return request.post('/cart/add', {
      goodsId,
      goodsNum,
      goodsSkuId
    })
  }
  export const getCart = () => {
    return request.get('/cart/list', {

    })
  }
  export const updateCart = (goodsId, goodsNum, goodsSkuId) => {
    return request.post('/cart/update', {
      goodsId,
      goodsNum,
      goodsSkuId
    })
  }

  export const deleteCart = async (cartId) => {
    return await request.post('/cart/clear', {
      cartIds:[cartId]
    })
  }