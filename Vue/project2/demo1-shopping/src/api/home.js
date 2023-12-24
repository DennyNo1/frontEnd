import request from '@/utils/request'
export const getHomeData = () => {
    //首页的东西在项目中是固定的。对于未登录用户确实可以这样。但是如果对于登录用户，首页肯定是根据算法推荐的。
    return request.get('/page/detail')
}