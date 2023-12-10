import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id
      );

      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity += 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity * newItem.price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      console.log(state.cartItems);
    },
    removeItemFromCart: (state, action) => {
      const selectItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id == selectItem.id
      );
      state.cartItems.splice(selectCartIndex, 1);
    },
    removeQuantity: (state, action) => {
      const selectItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id == selectItem.id
      );
      if (state.cartItems[selectCartIndex].quantity !== 0) {
        state.cartItems[selectCartIndex].quantity -= 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity * selectItem.price;
      } else {
        state.cartItems.splice(selectCartIndex, 1);
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeQuantity } =
  cartSlice.actions;

export default cartSlice;

// selector
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrices = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
