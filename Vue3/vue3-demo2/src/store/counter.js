import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
//定义store并导出
export const useCounterStore=defineStore('counter',()=>{
    //声明数据state
    const count=ref(0)
    //声明擦欧总数据的方法actiong
    const addCount=()=>count.value++
    const subCount=()=>count.value--
    //声明基于数据派生的计算属性getters
    const double=computed(()=>count.value*2)



    //必须return
    return{count,addCount,subCount,double}
}
,{
    persist: true,
})