import { useContext, useEffect } from "react";
import { ProductCard } from "../components/product/ProductCard";
import { ProductContext } from "../Context/ProductContext";
import { useAppSelector } from "../hooks/hooks";
import { FlatList } from "react-native";

export const Home = () => {
  const { getAllProducts, loadCartFromStorage } = useContext(ProductContext);
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    getAllProducts();
    loadCartFromStorage();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => String(product.id)}
      renderItem={({ item }) => <ProductCard {...item} />}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    />
  );
};
