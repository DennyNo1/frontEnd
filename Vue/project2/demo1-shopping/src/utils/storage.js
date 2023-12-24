//将vuex的数据对象，放到本地持久化
export const setData = (obj) => {
    localStorage.setItem('shopping_userInfo',JSON.stringify(obj))
}//对象不能直接往本地存。需要序列化。

//返回本地的数据
export const getData = () => {
    const userInfo={
        token:'',
        userId:''
    }
    const res=localStorage.getItem('shopping_userInfo')
    return res?JSON.parse(res):userInfo
    //res为空和不为空，在JavaScript中可以视作false和true。
    //反序列化

}
export const removeallData = () =>{
    localStorage.removeItem('shopping_userInfo')

}