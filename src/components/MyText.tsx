import {
  Text,
  StyleSheet,
  useColorScheme,
  StyleProp,
  TextStyle,
} from "react-native";
import Colors from "../../constants/colors";

interface IProps {
  children: any;
  type?: "title" | "body" | "caption";
  style?: StyleProp<TextStyle>;
}

export const MyText = ({ children, type = "body", style }: IProps) => {
  const theme = useColorScheme();

  return (
    <Text style={[styles[type], { color: Colors[theme!].text }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  body: {
    fontSize: 18,
  },
  caption: {
    fontSize: 14,
  },
});
