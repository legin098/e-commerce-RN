import { MyText } from "../components/MyText";
import { View } from "../components/themed/Themed";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Image,
  View as DefaultView,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { addProduct, subtractProduct } from "../features/cart";
import { MyButton } from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";

export const ProductDetail = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<any>();
  const { productDetail } = useAppSelector((state) => state.products);
  const productsCart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleClickLess = () => {
    dispatch(subtractProduct(productDetail));
  };

  const handleClickAdd = () => {
    dispatch(addProduct(productDetail));
  };

  const currentProductCart = productsCart.find(
    (product) => product.id === productDetail.id
  );
  const quantity = currentProductCart?.quantity || 0;

  return (
    <View style={{ margin: 10 }}>
      <Image
        source={{ uri: productDetail.image }}
        style={{ width: "100%", height: 270, resizeMode: "contain" }}
      />
      <DefaultView>
        <MyText
          type="title"
          style={{
            textAlign: "center",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          {productDetail.name}
        </MyText>
        <MyText type="caption" style={{ marginTop: 15, flexShrink: 1 }}>
          {productDetail.description}
        </MyText>
      </DefaultView>
      <DefaultView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <MyText type="body" style={{ fontWeight: "500" }}>
          In stock: {productDetail.stock}
        </MyText>
        <MyText type="body" style={{ fontWeight: "500" }}>
          Unit price: {productDetail.unit_price}
        </MyText>
      </DefaultView>
      <MyText
        type="body"
        style={{
          textAlign: "center",
          marginTop: 30,
          fontSize: 20,
          fontWeight: "500",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        Agregar al Carrito
      </MyText>
      <DefaultView
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <AntDesign
          name="minuscircleo"
          size={30}
          color={colorScheme === "light" ? "black" : "white"}
          onPress={handleClickLess}
          disabled={quantity <= 0}
        />
        <MyText type="title">{quantity}</MyText>
        <AntDesign
          name="pluscircleo"
          size={30}
          color={colorScheme === "light" ? "black" : "white"}
          onPress={handleClickAdd}
        />
      </DefaultView>
      <MyButton
        title="Ir al carrito"
        style={{ marginVertical: 40 }}
        onPress={() => navigation.navigate("Cart")}
      />
    </View>
  );
};
