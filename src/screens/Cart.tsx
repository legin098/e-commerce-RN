import { MyButton } from "../components/MyButton";
import { MyText } from "../components/MyText";
import { View as CustomView } from "../components/themed/Themed";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import { useContext, useMemo, useCallback } from "react";
import { ProductContext } from "../Context/ProductContext";
import { IProductCart, deleteProductsCart } from "../features/cart";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Root";
import Colors from "../../constants/colors";

interface IPropsCartItem {
  item: IProductCart;
  onPress: () => void;
}

const CartItem = ({ item, onPress }: IPropsCartItem) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      style={{
        marginVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors[theme!].text + 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            marginBottom: 5,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </View>
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
  );
};

export const Cart = () => {
  const cartProducts = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { buyProducts, getDetailProduct } = useContext(ProductContext);

  const totalPrice = useMemo(
    () =>
      cartProducts.reduce(
        (acc, curr) => acc + curr.quantity * curr.unit_price,
        0
      ),
    [cartProducts]
  );

  const handlePressProduct = (id: number) => {
    getDetailProduct(id).then(() => {
      navigation.navigate("ProductDetail");
    });
  };

  const renderCartItem = useCallback(
    ({ item }: any) => (
      <CartItem item={item} onPress={() => handlePressProduct(item.id)} />
    ),
    [handlePressProduct]
  );

  return (
    <CustomView>
      {cartProducts.length ? (
        <>
          <FlatList
            data={cartProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
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
        <MyText type="title" style={{ textAlign: "center" }}>
          No hay productos seleccionados 😕
        </MyText>
      )}
    </CustomView>
  );
};
