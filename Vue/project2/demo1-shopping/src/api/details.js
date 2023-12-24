import request from '@/utils/request'
export const getDetails = (goods_id) => {
    return  request.get('/goods/detail',
    {
        params:{
            goods_id
        }
    }
    )
}
