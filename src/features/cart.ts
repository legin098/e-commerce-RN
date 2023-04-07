import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProduct } from "./products";

export interface IProductCart extends IProduct {
  quantity: number;
}

export interface ICartState extends Array<IProductCart> {}

const initialState: ICartState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartFromStorage: (state, action) => {
      state = action.payload;
    },
    addProduct: (state, action) => {
      const existProductIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existProductIndex >= 0) {
        state[existProductIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      AsyncStorage.setItem("cart", JSON.stringify(state));
    },
    subtractProduct: (state, action) => {
      const existProductIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existProductIndex >= 0) {
        state[existProductIndex].quantity -= 1;
        if (state[existProductIndex].quantity === 0) {
          state.splice(existProductIndex, 1);
        }
        AsyncStorage.setItem("cart", JSON.stringify(state));
      }
    },
    deleteProductsCart: (state) => {
      state.length = 0;
      AsyncStorage.removeItem("cart");
    },
  },
});

export const { addProduct, subtractProduct, deleteProductsCart, loadCartFromStorage } =
  cartSlice.actions;

export default cartSlice.reducer;
