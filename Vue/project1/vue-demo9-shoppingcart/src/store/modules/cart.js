import axios from "axios"

const state={
    
        res:[]
    
}
const getters={
    total(state){
        return state.res.reduce((sum,item) => sum+=item.count,0)//初始值为0
    },
    totalPrice(state){
        return state.res.reduce((sum,item) => sum+=item.count*item.price,0)
    }
}
const mutations={
    updateData(state,data){
        state.res=data.data
    }//把数据传到store


}
const actions={
    async getData(context)
    {
        const data=await axios.get('http://localhost:3000/cart')
        context.commit('updateData',data)
    },
    async changeCount(context,obj)//把新数据更新到后端
    {
        const data = await axios.patch(`http://localhost:3000/cart/${obj.id}`, {
            count: obj.newCount
          });
        console.log(data)
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
}