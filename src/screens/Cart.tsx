import { MyButton } from "../components/MyButton";
import { MyText } from "../components/MyText";
import { ScrollView } from "../components/themed/Themed";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { deleteProductsCart } from "../features/cart";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Root";

export const Cart = () => {
  const cartProducts = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { buyProducts, getDetailProduct } = useContext(ProductContext);

  const totalPrice = cartProducts.reduce(
    (acc, curr) => acc + curr.quantity * curr.unit_price,
    0
  );

  const handlePressProduct = (id: number) => {
    getDetailProduct(id).then(() => {
      navigation.navigate("ProductDetail");
    });
  };

  return (
    <ScrollView>
      {cartProducts.length ? (
        <>
          {cartProducts.map((item) => (
            <TouchableOpacity
              style={{
                marginVertical: 10,
                borderBottomWidth: StyleSheet.hairlineWidth,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => handlePressProduct(item.id)}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    resizeMode: "contain",
                  }}
                />
                <View style={{ marginLeft: 15 }}>
                  <MyText type="body" style={{ fontWeight: "500" }}>
                    {item.name}
                  </MyText>
                  <MyText type="caption">Cantidad: {item.quantity}</MyText>
                </View>
              </View>

              <MyText type="body" style={{ fontWeight: "500" }}>
                Valor: {item.unit_price * item.quantity}
              </MyText>
            </TouchableOpacity>
          ))}
          <MyText
            type="body"
            style={{
              textAlign: "right",
              fontWeight: "500",
              marginVertical: 20,
            }}
          >
            Valor total: {totalPrice}
          </MyText>
          <MyButton title="Comprar" onPress={() => buyProducts(cartProducts)} />
          <MyButton
            title="Vaciar carrito"
            type="secondary"
            onPress={() => dispatch(deleteProductsCart())}
          />
        </>
      ) : (
        <MyText type="title">No hay productos seleccionados 😕</MyText>
      )}
    </ScrollView>
  );
};
