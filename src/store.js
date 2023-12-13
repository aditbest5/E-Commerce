import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cart/cartSlice";
import productSlice from "./features/productlist/productSlice";
import userSlice from "./features/auth/userSlice";
export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
  },
});
