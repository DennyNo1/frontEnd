import { getCart } from "@/api/cart"
export default{
    namespaced:true,
    state:{
            cartList:{}
    },
    mutations:{

        addIsChecked(state,res){
            for(let i=0;i<res.data.list.length;i++)
            {
                res.data.list[i].isChecked=true
            }
            state.cartList=res

        }
    },
    actions:{
        async getCartList({ commit }){
            const res= await getCart()
            commit('addIsChecked', res);
  
        }
    },
    getters:{

    }
}