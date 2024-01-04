import request from '@/utils/request'
export const getDataType = (dataType) => {
    return  request.get('/order/list',
    {
        params:{
            dataType:dataType,
            page:1
        }
    }
    )
}
export const cancel =(orderId) =>

{
  return request.post('/order/cancel',{
    orderId:orderId


  })
}
