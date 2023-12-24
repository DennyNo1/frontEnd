import request from '@/utils/request'
export const searchGoods = (sortType,sortPrice,categoryId,goodsName,page) => {
    return  request.get('/goods/list',
    {
        params:{
            sortType,
            sortPrice,
            categoryId,
            goodsName,
            page
        }
    }
    )
}