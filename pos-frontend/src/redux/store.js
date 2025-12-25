import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
    user: userSlice,
  },

  // Enable Redux DevTools only in development mode, can see data in Redux DevTools Extension
  devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
