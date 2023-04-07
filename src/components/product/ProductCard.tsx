import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { MyText } from "../MyText";
import { IProduct } from "../../features/products";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Root";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addProduct, subtractProduct } from "../../features/cart";

export const ProductCard = (product: IProduct) => {
  const colorScheme = useColorScheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getDetailProduct } = useContext(ProductContext);
  const productsCart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const currentProductCart = productsCart.find(
    (item) => item.id === product.id
  );
  const quantity = currentProductCart?.quantity || 0;

  const handlePressProduct = () => {
    getDetailProduct(product.id).then(() => {
      navigation.navigate("ProductDetail");
    });
  };

  const handleClickLess = () => {
    dispatch(subtractProduct(product));
  };

  const handleClickAdd = () => {
    dispatch(addProduct(product));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressProduct}>
        <View style={styles.containerImage}>
          <Image
            source={{ uri: product.image }}
            style={{ width: "100%", height: 250, resizeMode: "contain" }}
          />
        </View>
        <View>
          <MyText type="title">{product.name}</MyText>
          <View
            style={{
              marginTop: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MyText type="body" style={{ fontWeight: "600" }}>
                In Stock:
              </MyText>
              <MyText type="body">{product.stock}</MyText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MyText type="body" style={{ fontWeight: "600" }}>
                Unit Price:
              </MyText>
              <MyText type="body">{product.unit_price}</MyText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <AntDesign
          name="minuscircleo"
          size={24}
          color={colorScheme === "light" ? "black" : "white"}
          onPress={handleClickLess}
          disabled={quantity <= 0}
        />
        <MyText type="body">{quantity}</MyText>
        <AntDesign
          name="pluscircleo"
          size={24}
          color={colorScheme === "light" ? "black" : "white"}
          onPress={handleClickAdd}
          disabled={quantity >= product.stock}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    marginVertical: 20,
  },
  containerImage: {
    backgroundColor: "white",
    borderRadius: 12,
  },
});
