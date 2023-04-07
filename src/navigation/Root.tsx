import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";
import { Auth } from "../screens/Auth";
import { ProductProvider } from "../Context/ProductContext";
import { Cart } from "../screens/Cart";
import { ProductDetail } from "../screens/ProductDetail";
import { useAppSelector } from "../hooks/hooks";

export type RootStackParamList = {
  Login: undefined;
  BottomNavigation: undefined;
  ProductDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

interface IPropsRoot {
  colorScheme: "dark" | "light";
}

export default function Root({ colorScheme }: IPropsRoot) {
  return (
    <ProductProvider>
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}

function BottomNavigation() {
  const productsCart = useAppSelector((state) => state.cart);

  const totalQuantity = productsCart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cart-outline" color={color} />
          ),
          tabBarLabel: "Cart",
          tabBarBadge: totalQuantity,
        }}
      />
    </Tab.Navigator>
  );
}

function TabBarIcon(props: any) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}
