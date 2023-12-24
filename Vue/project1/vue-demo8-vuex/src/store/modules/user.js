//user模块
const state={
    userInfo:{
        name:'zht',
        age:18
    },
    score:999
}
const getters = {
    uppercase(state)  {
        return state.userInfo.name.toUpperCase();
    }
}
const mutations={
    addScore(state,n)
    {
        state.score+=n;
    }
}
const actions={}

export default{
    state,
    mutations,
    actions,getters
}