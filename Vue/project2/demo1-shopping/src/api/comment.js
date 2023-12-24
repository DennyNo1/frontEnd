import request from '@/utils/request'
export const getCommentNumber = (goods_id) => {
    return  request.get('/comment/total',
    {
        params:{
            goods_id
        }
    }
    )
}
export const getComment = (goods_id,limit) => {
    return  request.get('/comment/listRows',
    {
        params:{
            goods_id,
            limit
        }
    }
    )
}

export const getPartComment = (scoreType,goods_id,page) => {
    return  request.get('/comment/list',
    {
        params:{
            scoreType,
            goods_id,
            page
        }
    }
    )
}