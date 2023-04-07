import { createContext } from "react";
import { ApiEcommerce } from "../api/ApiEcommerce";
import { useAppDispatch } from "../hooks/hooks";
import { setProductDetail, setProducts } from "../features/products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ICartState,
  deleteProductsCart,
  loadCartFromStorage as loadCartFromStorageRedux,
} from "../features/cart";
import { dataDummy } from "../api/data";
import { dataDummyBuy } from "../api/dataBuy";

interface IProductContextProps {
  getAllProducts: () => Promise<void>;
  getDetailProduct: (id: number) => Promise<void>;
  loadCartFromStorage: () => Promise<void>;
  buyProducts: (cart: ICartState) => Promise<void>;
}

export const ProductContext = createContext({} as IProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const getAllProducts = async () => {
    try {
      const response = await ApiEcommerce.get("all-products");
      dispatch(setProducts(response.data.products));
    } catch (error) {
      console.log("getAllProducts error", error);
      //Solucion temporal porque la api no responde
      dispatch(setProducts(dataDummy.products));
    }
  };

  const getDetailProduct = async (id: number) => {
    try {
      const response = await ApiEcommerce.get(`detail/${id}`);
      dispatch(setProductDetail(response.data));
    } catch (error) {
      console.log("getDetailProduct error", error);
      //solucion temporal porque la api no responde
      const detail = dataDummy.products.filter((item) => item.id === id);
      dispatch(setProductDetail(detail[0]));
    }
  };

  const loadCartFromStorage = async () => {
    const cart = await AsyncStorage.getItem("cart");
    if (cart !== null) {
      dispatch(loadCartFromStorageRedux(JSON.parse(cart)));
    }
  };

  const buyProducts = async (cart: ICartState) => {
    try {
      const response = await ApiEcommerce.post("buy", cart);
      dispatch(setProducts(response.data.products));
      dispatch(deleteProductsCart());
    } catch (error) {
      console.log("buyProducts error", error);
      //Solucion temporal porque la api no responde
      dispatch(setProducts(dataDummyBuy.products));
      dispatch(deleteProductsCart());
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        getDetailProduct,
        loadCartFromStorage,
        buyProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
