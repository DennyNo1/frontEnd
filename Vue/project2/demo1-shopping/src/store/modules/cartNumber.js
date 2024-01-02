export default {
  namespaced: true,
  state: {
    showCart: false,
    CartList: [],
  },
  mutations: {
    addCartList(state, payload) {
        let existingItem = state.CartList.find(item => item.id === payload.id);
    
        if (existingItem) {
          // If the item exists, only update the number
          existingItem.number += payload.number;
        } else {
          // If the item doesn't exist, create a new object and push it to the CartList
          let newCartItem = {
            id: payload.id,
            image: payload.image,
            describe: payload.describe,
            price: payload.price,
            number: payload.number
          };
          state.CartList.push(newCartItem);
        }
    },
  },
  actions: {},
  getters: {
    totalNumber(state){
        let total=0;
        for (var i = 0; i < state.CartList; i++) {
            total+=state.CartList[i].number
          }
          return total
    },
    totalPrice(state){
        let total=0;
        for (var i = 0; i < state.CartList; i++) {
            total+=state.CartList[i].price
          }
          return total
    },
  },
};
