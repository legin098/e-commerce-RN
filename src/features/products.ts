import { createSlice } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  name: string;
  unit_price: number;
  stock: number;
  description?: string;
  image: string;
}

interface IProductsGLobal {
  products: IProduct[];
  productDetail: IProduct;
}

const initialState: IProductsGLobal = {
  products: [],
  productDetail: {
    id: 0,
    name: "",
    unit_price: 0,
    stock: 0,
    description: "",
    image: "",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});

export const { setProducts, setProductDetail } = productsSlice.actions;

export default productsSlice.reducer;
