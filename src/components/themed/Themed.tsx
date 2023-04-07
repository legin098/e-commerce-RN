import {
  useColorScheme,
  View as DefaultView,
  StyleProp,
  TextStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../../../constants/colors";

interface IProps {
  style?: StyleProp<TextStyle>;
  otherProps?: {
    [x: string]: any;
  };
  children: any;
}

export function View({ style, children, ...otherProps }: IProps) {
  const theme = useColorScheme();

  return (
    <DefaultView
      style={[
        { backgroundColor: Colors[theme!].background, paddingHorizontal: 18 },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </DefaultView>
  );
}

interface IPropsScrollView {
  style?: StyleProp<TextStyle>;
  otherProps?: {
    [x: string]: any;
  };
  children?: any;
}

export function ScrollView({
  style,
  children,
  ...otherProps
}: IPropsScrollView) {
  const theme = useColorScheme();
  return (
    <KeyboardAwareScrollView
      style={[
        { backgroundColor: Colors[theme!].background, paddingHorizontal: 18 },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
