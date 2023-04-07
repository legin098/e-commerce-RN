import { TextInput, View, StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/colors";
import { MyText } from "./MyText";

interface IProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

export const MyInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}: IProps) => {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <MyText type={"caption"} style={{ fontWeight: "bold", marginBottom: 5 }}>
        {label}
      </MyText>
      <TextInput
        placeholder={label}
        style={[styles.input, styles[theme!]]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  dark: {
    backgroundColor: Colors.dark.text + "06",
    borderColor: Colors.dark.text + "80",
    color: Colors.dark.text,
  },
  light: {
    backgroundColor: Colors.light.text + "06",
    borderColor: Colors.light.text + "80",
    color: Colors.light.text,
  },
});
